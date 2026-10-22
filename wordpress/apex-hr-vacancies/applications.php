<?php
/**
 * Private application storage and WordPress administration.
 *
 * @package ApexHRVacancies
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'APEX_HR_APPLICATIONS_SCHEMA_VERSION', '1' );
define( 'APEX_HR_APPLICATIONS_OPTION', 'apex_hr_applications_schema_version' );
define( 'APEX_HR_APPLICATIONS_TABLE_SUFFIX', 'apex_hr_applications' );
define( 'APEX_HR_APPLICATIONS_RECIPIENT_OPTION', 'apex_hr_application_notification_recipient' );
define( 'APEX_HR_APPLICATIONS_DEFAULT_RECIPIENT', 'bilkis@apexhrllc.co.uk' );
define( 'APEX_HR_APPLICATIONS_MAX_CV_SIZE', 5242880 );

/**
 * Return application statuses supported by the administrator workflow.
 *
 * @return array<string, string>
 */
function apex_hr_applications_statuses() {
	return array(
		'New'        => __( 'New', 'apex-hr-vacancies' ),
		'Reviewing'  => __( 'Reviewing', 'apex-hr-vacancies' ),
		'Shortlisted' => __( 'Shortlisted', 'apex-hr-vacancies' ),
		'Interview'  => __( 'Interview', 'apex-hr-vacancies' ),
		'Rejected'   => __( 'Rejected', 'apex-hr-vacancies' ),
		'Hired'      => __( 'Hired', 'apex-hr-vacancies' ),
		'Withdrawn'  => __( 'Withdrawn', 'apex-hr-vacancies' ),
	);
}

/**
 * Return notification states used by the application records.
 *
 * @return array<string, string>
 */
function apex_hr_applications_notification_statuses() {
	return array(
		'pending' => __( 'Pending', 'apex-hr-vacancies' ),
		'sent'    => __( 'Sent', 'apex-hr-vacancies' ),
		'failed'  => __( 'Failed', 'apex-hr-vacancies' ),
	);
}

/**
 * Get the dedicated application table name.
 *
 * @return string
 */
function apex_hr_applications_table_name() {
	global $wpdb;

	return $wpdb->prefix . APEX_HR_APPLICATIONS_TABLE_SUFFIX;
}

/**
 * Check whether the application table exists.
 *
 * @return bool
 */
function apex_hr_applications_table_exists() {
	global $wpdb;

	$table = apex_hr_applications_table_name();
	$found = $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $wpdb->esc_like( $table ) ) );

	return $table === $found;
}

/**
 * Create or upgrade the operational application table without deleting data.
 *
 * @return bool
 */
function apex_hr_applications_install_schema() {
	global $wpdb;

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';

	$table           = apex_hr_applications_table_name();
	$charset_collate = $wpdb->get_charset_collate();
	$sql             = "CREATE TABLE {$table} (
		id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
		public_uuid char(36) NOT NULL,
		vacancy_id bigint(20) unsigned NOT NULL,
		vacancy_title varchar(255) NOT NULL DEFAULT '',
		vacancy_slug varchar(200) NOT NULL DEFAULT '',
		vacancy_reference varchar(80) NOT NULL DEFAULT '',
		candidate_first_name varchar(120) NOT NULL DEFAULT '',
		candidate_last_name varchar(120) NOT NULL DEFAULT '',
		candidate_email varchar(254) NOT NULL DEFAULT '',
		candidate_phone varchar(40) NOT NULL DEFAULT '',
		linkedin_url varchar(2048) NOT NULL DEFAULT '',
		supporting_statement longtext NOT NULL,
		additional_message longtext NOT NULL,
		private_cv_path varchar(1024) NOT NULL DEFAULT '',
		cv_original_filename varchar(255) NOT NULL DEFAULT '',
		cv_mime_type varchar(127) NOT NULL DEFAULT '',
		cv_file_size bigint(20) unsigned NOT NULL DEFAULT 0,
		application_status varchar(32) NOT NULL DEFAULT 'New',
		notification_status varchar(32) NOT NULL DEFAULT 'pending',
		notification_error text NULL,
		privacy_consent tinyint(1) NOT NULL DEFAULT 0,
		consent_text_version varchar(64) NOT NULL DEFAULT '',
		consent_timestamp datetime NULL,
		source_url text NOT NULL,
		utm_source varchar(255) NOT NULL DEFAULT '',
		utm_medium varchar(255) NOT NULL DEFAULT '',
		utm_campaign varchar(255) NOT NULL DEFAULT '',
		utm_term varchar(255) NOT NULL DEFAULT '',
		utm_content varchar(255) NOT NULL DEFAULT '',
		retention_expires_at datetime NULL,
		created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
		updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
		anonymised_at datetime NULL,
		PRIMARY KEY  (id),
		UNIQUE KEY public_uuid (public_uuid),
		KEY vacancy_id (vacancy_id),
		KEY candidate_email (candidate_email),
		KEY application_status (application_status),
		KEY notification_status (notification_status),
		KEY created_at (created_at)
	) {$charset_collate};";

	dbDelta( $sql );

	if ( ! apex_hr_applications_table_exists() ) {
		return false;
	}

	update_option( APEX_HR_APPLICATIONS_OPTION, APEX_HR_APPLICATIONS_SCHEMA_VERSION, false );
	add_option( APEX_HR_APPLICATIONS_RECIPIENT_OPTION, APEX_HR_APPLICATIONS_DEFAULT_RECIPIENT, '', false );

	return true;
}

/**
 * Upgrade schema when this plugin version introduces a newer table structure.
 *
 * @return void
 */
function apex_hr_applications_maybe_upgrade_schema() {
	$stored_version = (string) get_option( APEX_HR_APPLICATIONS_OPTION, '0' );

	if ( version_compare( $stored_version, APEX_HR_APPLICATIONS_SCHEMA_VERSION, '<' ) ) {
		apex_hr_applications_install_schema();
	}
}
add_action( 'plugins_loaded', 'apex_hr_applications_maybe_upgrade_schema', 5 );

/**
 * Grant only the application capabilities required by site administrators.
 *
 * @return void
 */
function apex_hr_applications_grant_admin_capabilities() {
	$administrator = get_role( 'administrator' );

	if ( ! $administrator ) {
		return;
	}

	$administrator->add_cap( 'manage_apex_hr_applications' );
	$administrator->add_cap( 'download_apex_hr_cvs' );
}

/**
 * Install the schema and administrator capabilities on plugin activation.
 *
 * @return void
 */
function apex_hr_applications_activate() {
	apex_hr_applications_install_schema();
	apex_hr_applications_grant_admin_capabilities();
}
register_activation_hook( __DIR__ . '/apex-hr-vacancies.php', 'apex_hr_applications_activate' );

/**
 * Resolve and prepare a private directory outside the public document root.
 *
 * A configured path is authoritative: an unsafe or unwritable configured path
 * does not trigger a fallback to a different location.
 *
 * @return string|WP_Error
 */
function apex_hr_applications_private_directory() {
	$configured = defined( 'APEX_HR_PRIVATE_CV_DIR' );
	$document_root = isset( $_SERVER['DOCUMENT_ROOT'] ) ? realpath( wp_unslash( $_SERVER['DOCUMENT_ROOT'] ) ) : false;
	$public_root   = false !== $document_root ? $document_root : realpath( ABSPATH );
	if ( false === $public_root ) {
		return new WP_Error( 'apex_hr_private_storage_root', __( 'The public document root could not be verified.', 'apex-hr-vacancies' ) );
	}

	$fallback_base = dirname( $public_root );
	$directory     = $configured
		? APEX_HR_PRIVATE_CV_DIR
		: trailingslashit( $fallback_base ) . 'apex-hr-private-cvs';

	if ( ! is_string( $directory ) || '' === trim( $directory ) || ! preg_match( '~^(?:[A-Za-z]:[\\\\/]|/)~', $directory ) ) {
		return new WP_Error( 'apex_hr_private_storage_path', __( 'The private CV directory must be an absolute path.', 'apex-hr-vacancies' ) );
	}

	$directory = wp_normalize_path( $directory );
	$resolved  = realpath( $directory );
	$candidate = false === $resolved ? wp_normalize_path( $directory ) : wp_normalize_path( $resolved );
	$root      = trailingslashit( wp_normalize_path( $public_root ) );

	$compare    = DIRECTORY_SEPARATOR === '\\' ? strtolower( $candidate ) : $candidate;
	$root_check = DIRECTORY_SEPARATOR === '\\' ? strtolower( $root ) : $root;

	if ( $root_check === trailingslashit( $compare ) || 0 === strpos( $compare, $root_check ) ) {
		return new WP_Error( 'apex_hr_private_storage_public', __( 'The private CV directory must be outside the public document root.', 'apex-hr-vacancies' ) );
	}

	$parent = realpath( dirname( $directory ) );
	if ( false === $resolved && false === $parent ) {
		return new WP_Error( 'apex_hr_private_storage_parent', __( 'The parent directory for private CV storage must already exist.', 'apex-hr-vacancies' ) );
	}
	if ( false === $resolved ) {
		$parent_check = wp_normalize_path( $parent );
		$parent_check = DIRECTORY_SEPARATOR === '\\' ? strtolower( trailingslashit( $parent_check ) ) : trailingslashit( $parent_check );
		if ( 0 === strpos( $parent_check, $root_check ) ) {
			return new WP_Error( 'apex_hr_private_storage_public', __( 'The private CV directory must be outside the public document root.', 'apex-hr-vacancies' ) );
		}
		$candidate = trailingslashit( wp_normalize_path( $parent ) ) . basename( $directory );
	}

	if ( ! is_dir( $candidate ) && ! wp_mkdir_p( $candidate ) ) {
		return new WP_Error( 'apex_hr_private_storage_create', __( 'The private CV directory could not be created.', 'apex-hr-vacancies' ) );
	}

	$resolved = realpath( $candidate );
	if ( false === $resolved || ! is_dir( $resolved ) ) {
		return new WP_Error( 'apex_hr_private_storage_resolve', __( 'The private CV directory could not be resolved.', 'apex-hr-vacancies' ) );
	}

	$resolved = wp_normalize_path( $resolved );
	$resolved_check = DIRECTORY_SEPARATOR === '\\' ? strtolower( trailingslashit( $resolved ) ) : trailingslashit( $resolved );
	if ( 0 === strpos( $resolved_check, $root_check ) ) {
		return new WP_Error( 'apex_hr_private_storage_public', __( 'The private CV directory must be outside the public document root.', 'apex-hr-vacancies' ) );
	}

	if ( DIRECTORY_SEPARATOR !== '\\' && ! @chmod( $resolved, 0700 ) ) {
		return new WP_Error( 'apex_hr_private_storage_permissions', __( 'Private CV storage permissions could not be restricted to the server account.', 'apex-hr-vacancies' ) );
	}

	if ( ! is_writable( $resolved ) ) {
		return new WP_Error( 'apex_hr_private_storage_unwritable', __( 'The private CV directory is not writable by the web server.', 'apex-hr-vacancies' ) );
	}

	return untrailingslashit( $resolved );
}

/**
 * Validate a CV filename extension, MIME type and size.
 *
 * @param string $filename Original filename.
 * @param string $mime_type Detected MIME type.
 * @param int    $file_size File size in bytes.
 * @return true|WP_Error
 */
function apex_hr_applications_validate_cv( $filename, $mime_type, $file_size ) {
	$allowed = array(
		'pdf'  => array( 'application/pdf' ),
		'doc'  => array( 'application/msword' ),
		'docx' => array( 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ),
	);
	$extension = strtolower( pathinfo( sanitize_file_name( (string) $filename ), PATHINFO_EXTENSION ) );
	$mime_type = strtolower( trim( (string) $mime_type ) );

	if ( ! isset( $allowed[ $extension ] ) || ! in_array( $mime_type, $allowed[ $extension ], true ) ) {
		return new WP_Error( 'apex_hr_invalid_cv_type', __( 'CV files must be PDF, DOC or DOCX with a matching MIME type.', 'apex-hr-vacancies' ) );
	}

	if ( ! is_numeric( $file_size ) || (int) $file_size < 1 || (int) $file_size > APEX_HR_APPLICATIONS_MAX_CV_SIZE ) {
		return new WP_Error( 'apex_hr_invalid_cv_size', __( 'CV files must be no larger than 5 MB.', 'apex-hr-vacancies' ) );
	}

	return true;
}

/**
 * Generate an unpredictable server-side CV filename.
 *
 * @param string $extension Allowed extension.
 * @return string|WP_Error
 */
function apex_hr_applications_random_cv_filename( $extension ) {
	$extension = strtolower( ltrim( sanitize_text_field( (string) $extension ), '.' ) );
	if ( ! in_array( $extension, array( 'pdf', 'doc', 'docx' ), true ) ) {
		return new WP_Error( 'apex_hr_invalid_cv_extension', __( 'The CV file extension is not allowed.', 'apex-hr-vacancies' ) );
	}

	try {
		return bin2hex( random_bytes( 16 ) ) . '.' . $extension;
	} catch ( Exception $exception ) {
		return new WP_Error( 'apex_hr_cv_filename', __( 'A secure CV filename could not be generated.', 'apex-hr-vacancies' ) );
	}
}

/**
 * Delete only a regular file directly inside the resolved private directory.
 *
 * @param string $file_path Stored file path.
 * @return bool|WP_Error
 */
function apex_hr_applications_delete_private_file( $file_path ) {
	$directory = apex_hr_applications_private_directory();
	if ( is_wp_error( $directory ) ) {
		return $directory;
	}

	$file_path = wp_normalize_path( (string) $file_path );
	$real_file = realpath( $file_path );
	if ( false === $real_file ) {
		return true;
	}

	if ( is_link( $file_path ) || wp_normalize_path( dirname( $real_file ) ) !== wp_normalize_path( $directory ) || ! is_file( $real_file ) ) {
		return new WP_Error( 'apex_hr_cv_delete_path', __( 'The file is not a regular file in private CV storage.', 'apex-hr-vacancies' ) );
	}

	if ( ! wp_delete_file( $real_file ) && file_exists( $real_file ) ) {
		return new WP_Error( 'apex_hr_cv_delete_failed', __( 'The private CV file could not be deleted.', 'apex-hr-vacancies' ) );
	}

	return true;
}

/**
 * Register the application submenu pages and settings API option.
 *
 * @return void
 */
function apex_hr_applications_register_admin() {
	add_submenu_page(
		'edit.php?post_type=vacancy',
		__( 'Applications', 'apex-hr-vacancies' ),
		__( 'Applications', 'apex-hr-vacancies' ),
		'manage_apex_hr_applications',
		'apex-hr-applications',
		'apex_hr_applications_render_list_page'
	);
	add_submenu_page(
		'edit.php?post_type=vacancy',
		__( 'Application Settings', 'apex-hr-vacancies' ),
		__( 'Application Settings', 'apex-hr-vacancies' ),
		'manage_apex_hr_applications',
		'apex-hr-application-settings',
		'apex_hr_applications_render_settings'
	);

}
add_action( 'admin_menu', 'apex_hr_applications_register_admin' );
add_action( 'admin_init', 'apex_hr_applications_register_settings' );

/**
 * Register settings sections and fields after registering the option.
 *
 * @return void
 */
function apex_hr_applications_register_settings() {
	register_setting(
		'apex_hr_application_settings',
		APEX_HR_APPLICATIONS_RECIPIENT_OPTION,
		array(
			'type'              => 'string',
			'sanitize_callback' => 'apex_hr_applications_sanitize_recipient',
			'default'           => APEX_HR_APPLICATIONS_DEFAULT_RECIPIENT,
		)
	);

	add_settings_section(
		'apex_hr_application_notifications',
		__( 'Application notifications', 'apex-hr-vacancies' ),
		'__return_false',
		'apex-hr-application-settings'
	);
	add_settings_field(
		APEX_HR_APPLICATIONS_RECIPIENT_OPTION,
		__( 'Notification recipient', 'apex-hr-vacancies' ),
		'apex_hr_applications_render_recipient_field',
		'apex-hr-application-settings',
		'apex_hr_application_notifications'
	);
}

/**
 * Sanitize the administrator-configured notification address.
 *
 * @param mixed $value Submitted email address.
 * @return string
 */
function apex_hr_applications_sanitize_recipient( $value ) {
	$email = is_scalar( $value ) ? sanitize_email( (string) $value ) : '';
	if ( is_email( $email ) ) {
		return $email;
	}

	add_settings_error(
		APEX_HR_APPLICATIONS_RECIPIENT_OPTION,
		'apex_hr_invalid_notification_recipient',
		__( 'Enter a valid notification email address. The previous value has been retained.', 'apex-hr-vacancies' ),
		'error'
	);

	return get_option( APEX_HR_APPLICATIONS_RECIPIENT_OPTION, APEX_HR_APPLICATIONS_DEFAULT_RECIPIENT );
}

/**
 * Render the notification recipient input.
 *
 * @return void
 */
function apex_hr_applications_render_recipient_field() {
	$value = get_option( APEX_HR_APPLICATIONS_RECIPIENT_OPTION, APEX_HR_APPLICATIONS_DEFAULT_RECIPIENT );
	echo '<input class="regular-text" type="email" id="' . esc_attr( APEX_HR_APPLICATIONS_RECIPIENT_OPTION ) . '" name="' . esc_attr( APEX_HR_APPLICATIONS_RECIPIENT_OPTION ) . '" value="' . esc_attr( $value ) . '" required />';
	echo '<p class="description">' . esc_html__( 'This recipient is saved for the Phase 2 notification integration. No email is sent in Phase 1.', 'apex-hr-vacancies' ) . '</p>';
}

/**
 * Check the current user before rendering any applications page.
 *
 * @return bool
 */
function apex_hr_applications_require_management_capability() {
	if ( current_user_can( 'manage_apex_hr_applications' ) ) {
		return true;
	}

	wp_die( esc_html__( 'You are not allowed to manage applications.', 'apex-hr-vacancies' ), '', array( 'response' => 403 ) );
	return false;
}

/**
 * Show a private-storage availability notice to application managers.
 *
 * @return void
 */
function apex_hr_applications_storage_admin_notice() {
	if ( ! current_user_can( 'manage_apex_hr_applications' ) ) {
		return;
	}

	$directory = apex_hr_applications_private_directory();
	if ( is_wp_error( $directory ) ) {
		echo '<div class="notice notice-error"><p>' . esc_html__( 'Apex HR private CV storage is unavailable. Configure APEX_HR_PRIVATE_CV_DIR in wp-config.php or make the private server directory writable. CV files will not be stored in the Media Library.', 'apex-hr-vacancies' ) . ' ' . esc_html( $directory->get_error_message() ) . '</p></div>';
	}
}
add_action( 'admin_notices', 'apex_hr_applications_storage_admin_notice' );

/**
 * Render an applications action outcome.
 *
 * @return void
 */
function apex_hr_applications_render_action_notice() {
	if ( ! isset( $_GET['apex_hr_result'] ) ) {
		return;
	}

	$result = sanitize_key( wp_unslash( $_GET['apex_hr_result'] ) );
	$notice = 'updated' === $result
		? __( 'Application status updated.', 'apex-hr-vacancies' )
		: __( 'The application status could not be updated. Please try again.', 'apex-hr-vacancies' );
	$class  = 'updated' === $result ? 'notice-success' : 'notice-error';

	echo '<div class="notice ' . esc_attr( $class ) . '"><p>' . esc_html( $notice ) . '</p></div>';
}

/**
 * Build sanitized list filters for the applications screen.
 *
 * @return array<string, mixed>
 */
function apex_hr_applications_get_filters() {
	$filters = array(
		'search'                => '',
		'vacancy_id'            => 0,
		'application_status'    => '',
		'notification_status'   => '',
		'paged'                 => 1,
	);

	if ( isset( $_GET['s'] ) && is_scalar( $_GET['s'] ) ) {
		$filters['search'] = sanitize_text_field( wp_unslash( (string) $_GET['s'] ) );
	}
	if ( isset( $_GET['vacancy_id'] ) ) {
		$filters['vacancy_id'] = absint( $_GET['vacancy_id'] );
	}
	if ( isset( $_GET['application_status'] ) ) {
		$status = sanitize_text_field( wp_unslash( $_GET['application_status'] ) );
		if ( isset( apex_hr_applications_statuses()[ $status ] ) ) {
			$filters['application_status'] = $status;
		}
	}
	if ( isset( $_GET['notification_status'] ) ) {
		$status = sanitize_key( wp_unslash( $_GET['notification_status'] ) );
		if ( isset( apex_hr_applications_notification_statuses()[ $status ] ) ) {
			$filters['notification_status'] = $status;
		}
	}
	if ( isset( $_GET['paged'] ) ) {
		$filters['paged'] = max( 1, absint( $_GET['paged'] ) );
	}

	return $filters;
}

/**
 * Build the filter predicate for prepared application queries.
 *
 * @param array<string, mixed> $filters Sanitized filters.
 * @return array{0: string, 1: array<int, mixed>}
 */
function apex_hr_applications_query_predicate( $filters ) {
	global $wpdb;

	$where = array( '1 = 1' );
	$args  = array();

	if ( '' !== $filters['search'] ) {
		$like    = '%' . $wpdb->esc_like( $filters['search'] ) . '%';
		$where[] = '(candidate_first_name LIKE %s OR candidate_last_name LIKE %s OR candidate_email LIKE %s OR vacancy_title LIKE %s OR vacancy_reference LIKE %s)';
		$args    = array_merge( $args, array( $like, $like, $like, $like, $like ) );
	}
	if ( $filters['vacancy_id'] ) {
		$where[] = 'vacancy_id = %d';
		$args[]  = $filters['vacancy_id'];
	}
	if ( '' !== $filters['application_status'] ) {
		$where[] = 'application_status = %s';
		$args[]  = $filters['application_status'];
	}
	if ( '' !== $filters['notification_status'] ) {
		$where[] = 'notification_status = %s';
		$args[]  = $filters['notification_status'];
	}

	return array( implode( ' AND ', $where ), $args );
}

/**
 * Prepare SQL with a variable list of validated arguments.
 *
 * @param string              $query SQL query.
 * @param array<int, mixed>   $args  Arguments for placeholders.
 * @return string
 */
function apex_hr_applications_prepare_query( $query, $args ) {
	global $wpdb;

	return empty( $args ) ? $query : $wpdb->prepare( $query, $args );
}

/**
 * Render the paginated and filterable applications list.
 *
 * @return void
 */
function apex_hr_applications_render_list_table() {
	global $wpdb;

	apex_hr_applications_require_management_capability();
	echo '<div class="wrap"><h1>' . esc_html__( 'Applications', 'apex-hr-vacancies' ) . '</h1>';
	apex_hr_applications_render_action_notice();

	if ( ! apex_hr_applications_table_exists() ) {
		echo '<div class="notice notice-error"><p>' . esc_html__( 'The applications table is unavailable. The plugin schema upgrade must complete before applications can be viewed.', 'apex-hr-vacancies' ) . '</p></div></div>';
		return;
	}

	$filters = apex_hr_applications_get_filters();
	list( $predicate, $where_args ) = apex_hr_applications_query_predicate( $filters );
	$table     = apex_hr_applications_table_name();
	$per_page  = 20;
	$offset    = ( $filters['paged'] - 1 ) * $per_page;
	$count_sql = apex_hr_applications_prepare_query( "SELECT COUNT(*) FROM {$table} WHERE {$predicate}", $where_args );
	$total     = (int) $wpdb->get_var( $count_sql );
	$list_args = array_merge( $where_args, array( $per_page, $offset ) );
	$list_sql  = $wpdb->prepare(
		"SELECT id, candidate_first_name, candidate_last_name, candidate_email, vacancy_title, vacancy_reference, created_at, application_status, notification_status FROM {$table} WHERE {$predicate} ORDER BY created_at DESC, id DESC LIMIT %d OFFSET %d",
		$list_args
	);
	$rows      = $wpdb->get_results( $list_sql );
	if ( '' !== $wpdb->last_error ) {
		echo '<div class="notice notice-error"><p>' . esc_html__( 'The applications could not be loaded because the database query failed.', 'apex-hr-vacancies' ) . '</p></div></div>';
		return;
	}

	$vacancies = get_posts(
		array(
			'post_type'      => 'vacancy',
			'post_status'    => array( 'publish', 'draft', 'pending', 'private', 'future' ),
			'posts_per_page' => 200,
			'orderby'        => 'title',
			'order'          => 'ASC',
		)
	);

	echo '<form method="get" action="' . esc_url( admin_url( 'admin.php' ) ) . '">';
	echo '<input type="hidden" name="page" value="apex-hr-applications" />';
	echo '<p class="search-box"><label class="screen-reader-text" for="apex-hr-application-search">' . esc_html__( 'Search applications', 'apex-hr-vacancies' ) . '</label><input type="search" id="apex-hr-application-search" name="s" value="' . esc_attr( $filters['search'] ) . '" /><input type="submit" class="button" value="' . esc_attr__( 'Search applications', 'apex-hr-vacancies' ) . '" /></p>';
	echo '<div class="tablenav top"><div class="alignleft actions">';
	echo '<label class="screen-reader-text" for="apex-hr-vacancy-filter">' . esc_html__( 'Filter by vacancy', 'apex-hr-vacancies' ) . '</label><select id="apex-hr-vacancy-filter" name="vacancy_id"><option value="0">' . esc_html__( 'All vacancies', 'apex-hr-vacancies' ) . '</option>';
	foreach ( $vacancies as $vacancy ) {
		printf( '<option value="%1$d" %2$s>%3$s</option>', (int) $vacancy->ID, selected( $filters['vacancy_id'], $vacancy->ID, false ), esc_html( $vacancy->post_title ) );
	}
	echo '</select>';
	echo '<label class="screen-reader-text" for="apex-hr-status-filter">' . esc_html__( 'Filter by application status', 'apex-hr-vacancies' ) . '</label><select id="apex-hr-status-filter" name="application_status"><option value="">' . esc_html__( 'All application statuses', 'apex-hr-vacancies' ) . '</option>';
	foreach ( apex_hr_applications_statuses() as $value => $label ) {
		printf( '<option value="%1$s" %2$s>%3$s</option>', esc_attr( $value ), selected( $filters['application_status'], $value, false ), esc_html( $label ) );
	}
	echo '</select>';
	echo '<label class="screen-reader-text" for="apex-hr-notification-filter">' . esc_html__( 'Filter by notification status', 'apex-hr-vacancies' ) . '</label><select id="apex-hr-notification-filter" name="notification_status"><option value="">' . esc_html__( 'All notification statuses', 'apex-hr-vacancies' ) . '</option>';
	foreach ( apex_hr_applications_notification_statuses() as $value => $label ) {
		printf( '<option value="%1$s" %2$s>%3$s</option>', esc_attr( $value ), selected( $filters['notification_status'], $value, false ), esc_html( $label ) );
	}
	echo '</select> <button type="submit" class="button">' . esc_html__( 'Filter', 'apex-hr-vacancies' ) . '</button></div></div>';
	echo '</form>';

	if ( empty( $rows ) ) {
		echo '<p>' . ( $total ? esc_html__( 'No applications match these filters.', 'apex-hr-vacancies' ) : esc_html__( 'No applications have been submitted yet.', 'apex-hr-vacancies' ) ) . '</p></div>';
		return;
	}

	echo '<table class="widefat striped"><thead><tr>';
	foreach ( array( 'Candidate', 'Vacancy', 'Email', 'Submitted', 'Application status', 'Notification status', 'Action' ) as $heading ) {
		echo '<th scope="col">' . esc_html( $heading ) . '</th>';
	}
	echo '</tr></thead><tbody>';
	foreach ( $rows as $row ) {
		$detail_url = add_query_arg(
			array(
				'page'           => 'apex-hr-applications',
				'application_id' => (int) $row->id,
			),
			admin_url( 'admin.php' )
		);
		$candidate  = trim( $row->candidate_first_name . ' ' . $row->candidate_last_name );
		$vacancy    = $row->vacancy_title . ( '' !== $row->vacancy_reference ? ' (' . $row->vacancy_reference . ')' : '' );
		echo '<tr>';
		echo '<td>' . esc_html( $candidate ) . '</td><td>' . esc_html( $vacancy ) . '</td><td>' . esc_html( $row->candidate_email ) . '</td>';
		echo '<td>' . esc_html( $row->created_at ) . '</td><td>' . esc_html( $row->application_status ) . '</td><td>' . esc_html( $row->notification_status ) . '</td>';
		echo '<td><a href="' . esc_url( $detail_url ) . '">' . esc_html__( 'View', 'apex-hr-vacancies' ) . '</a></td></tr>';
	}
	echo '</tbody></table>';

	$total_pages = (int) ceil( $total / $per_page );
	if ( $total_pages > 1 ) {
		$base_args = array(
			'page'                 => 'apex-hr-applications',
			'paged'                => '%#%',
			's'                    => $filters['search'],
			'vacancy_id'           => $filters['vacancy_id'],
			'application_status'   => $filters['application_status'],
			'notification_status'  => $filters['notification_status'],
		);
		echo '<div class="tablenav"><div class="tablenav-pages">' . wp_kses_post(
			paginate_links(
				array(
					'base'      => add_query_arg( $base_args, admin_url( 'admin.php' ) ),
					'format'    => '',
					'current'   => $filters['paged'],
					'total'     => $total_pages,
					'prev_text' => __( '&lsaquo; Previous', 'apex-hr-vacancies' ),
					'next_text' => __( 'Next &rsaquo;', 'apex-hr-vacancies' ),
				)
			)
		) . '</div></div>';
	}
	echo '</div>';
}

/**
 * Render every stored application field to an authorised administrator.
 *
 * @param object $application Application row.
 * @return void
 */
function apex_hr_applications_render_details( $application ) {
	$labels = array(
		'id'                    => __( 'Database ID', 'apex-hr-vacancies' ),
		'public_uuid'           => __( 'Public UUID', 'apex-hr-vacancies' ),
		'vacancy_id'            => __( 'Vacancy ID', 'apex-hr-vacancies' ),
		'vacancy_title'         => __( 'Vacancy title', 'apex-hr-vacancies' ),
		'vacancy_slug'          => __( 'Vacancy slug', 'apex-hr-vacancies' ),
		'vacancy_reference'     => __( 'Vacancy reference', 'apex-hr-vacancies' ),
		'candidate_first_name'  => __( 'Candidate first name', 'apex-hr-vacancies' ),
		'candidate_last_name'   => __( 'Candidate last name', 'apex-hr-vacancies' ),
		'candidate_email'       => __( 'Candidate email', 'apex-hr-vacancies' ),
		'candidate_phone'       => __( 'Candidate phone', 'apex-hr-vacancies' ),
		'linkedin_url'          => __( 'LinkedIn URL', 'apex-hr-vacancies' ),
		'supporting_statement'  => __( 'Cover letter / supporting statement', 'apex-hr-vacancies' ),
		'additional_message'    => __( 'Additional message', 'apex-hr-vacancies' ),
		'private_cv_path'       => __( 'Private CV storage path', 'apex-hr-vacancies' ),
		'cv_original_filename'  => __( 'Original CV filename', 'apex-hr-vacancies' ),
		'cv_mime_type'           => __( 'CV MIME type', 'apex-hr-vacancies' ),
		'cv_file_size'           => __( 'CV file size (bytes)', 'apex-hr-vacancies' ),
		'application_status'    => __( 'Application status', 'apex-hr-vacancies' ),
		'notification_status'   => __( 'Notification status', 'apex-hr-vacancies' ),
		'notification_error'    => __( 'Notification error', 'apex-hr-vacancies' ),
		'privacy_consent'       => __( 'Privacy consent', 'apex-hr-vacancies' ),
		'consent_text_version'  => __( 'Consent-text version', 'apex-hr-vacancies' ),
		'consent_timestamp'     => __( 'Consent timestamp', 'apex-hr-vacancies' ),
		'source_url'            => __( 'Source URL', 'apex-hr-vacancies' ),
		'utm_source'            => __( 'UTM source', 'apex-hr-vacancies' ),
		'utm_medium'            => __( 'UTM medium', 'apex-hr-vacancies' ),
		'utm_campaign'          => __( 'UTM campaign', 'apex-hr-vacancies' ),
		'utm_term'              => __( 'UTM term', 'apex-hr-vacancies' ),
		'utm_content'           => __( 'UTM content', 'apex-hr-vacancies' ),
		'retention_expires_at'  => __( 'Retention expiry date', 'apex-hr-vacancies' ),
		'created_at'            => __( 'Created', 'apex-hr-vacancies' ),
		'updated_at'            => __( 'Updated', 'apex-hr-vacancies' ),
		'anonymised_at'         => __( 'Anonymised', 'apex-hr-vacancies' ),
	);

	echo '<table class="widefat striped"><tbody>';
	foreach ( $labels as $column => $label ) {
		$value = $application->{$column};
		if ( 'privacy_consent' === $column ) {
			$value = (int) $value ? __( 'Yes', 'apex-hr-vacancies' ) : __( 'No', 'apex-hr-vacancies' );
		}
		echo '<tr><th scope="row" style="width:240px">' . esc_html( $label ) . '</th><td style="white-space:pre-wrap;overflow-wrap:anywhere">' . esc_html( (string) $value ) . '</td></tr>';
	}
	echo '</tbody></table>';
}

/**
 * Render an application detail view and the guarded status-change form.
 *
 * @return void
 */
function apex_hr_applications_render_details_page() {
	global $wpdb;

	apex_hr_applications_require_management_capability();
	$application_id = isset( $_GET['application_id'] ) ? absint( $_GET['application_id'] ) : 0;
	if ( ! $application_id || ! apex_hr_applications_table_exists() ) {
		wp_die( esc_html__( 'Application not found.', 'apex-hr-vacancies' ), '', array( 'response' => 404 ) );
	}

	$table       = apex_hr_applications_table_name();
	$application = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table} WHERE id = %d", $application_id ) );
	if ( '' !== $wpdb->last_error ) {
		wp_die( esc_html__( 'The application could not be loaded because the database query failed.', 'apex-hr-vacancies' ), '', array( 'response' => 500 ) );
	}
	if ( ! $application ) {
		wp_die( esc_html__( 'Application not found.', 'apex-hr-vacancies' ), '', array( 'response' => 404 ) );
	}

	echo '<div class="wrap"><h1>' . esc_html__( 'Application details', 'apex-hr-vacancies' ) . '</h1>';
	apex_hr_applications_render_action_notice();
	echo '<p><a href="' . esc_url( admin_url( 'admin.php?page=apex-hr-applications' ) ) . '">' . esc_html__( 'Back to applications', 'apex-hr-vacancies' ) . '</a></p>';
	apex_hr_applications_render_details( $application );

	echo '<h2>' . esc_html__( 'Update application status', 'apex-hr-vacancies' ) . '</h2>';
	echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '">';
	echo '<input type="hidden" name="action" value="apex_hr_update_application_status" />';
	echo '<input type="hidden" name="application_id" value="' . esc_attr( $application_id ) . '" />';
	wp_nonce_field( 'apex_hr_application_status_' . $application_id );
	echo '<label for="apex-hr-application-status">' . esc_html__( 'Application status', 'apex-hr-vacancies' ) . '</label> ';
	echo '<select id="apex-hr-application-status" name="application_status">';
	foreach ( apex_hr_applications_statuses() as $value => $label ) {
		printf( '<option value="%1$s" %2$s>%3$s</option>', esc_attr( $value ), selected( $application->application_status, $value, false ), esc_html( $label ) );
	}
	echo '</select> <button type="submit" class="button button-primary">' . esc_html__( 'Save status', 'apex-hr-vacancies' ) . '</button></form>';
	echo '<h2>' . esc_html__( 'CV file', 'apex-hr-vacancies' ) . '</h2><p><button type="button" class="button" disabled>' . esc_html__( 'Download CV', 'apex-hr-vacancies' ) . '</button> ' . esc_html__( 'Private download endpoint will be added in Phase 2.', 'apex-hr-vacancies' ) . '</p></div>';
}

/**
 * Dispatch application details when an ID is requested on the list page.
 *
 * @return void
 */
function apex_hr_applications_render_list_page() {
	if ( isset( $_GET['application_id'] ) ) {
		apex_hr_applications_render_details_page();
		return;
	}

	apex_hr_applications_render_list_table();
}

/**
 * Render the settings page and private-storage/database diagnostics.
 *
 * @return void
 */
function apex_hr_applications_render_settings() {
	apex_hr_applications_require_management_capability();
	$directory = apex_hr_applications_private_directory();
	$path      = is_wp_error( $directory ) ? __( 'Not available', 'apex-hr-vacancies' ) : $directory;
	$exists    = ! is_wp_error( $directory ) && is_dir( $directory );
	$writable  = ! is_wp_error( $directory ) && is_writable( $directory );

	echo '<div class="wrap"><h1>' . esc_html__( 'Application Settings', 'apex-hr-vacancies' ) . '</h1>';
	settings_errors();
	echo '<form method="post" action="options.php">';
	settings_fields( 'apex_hr_application_settings' );
	do_settings_sections( 'apex-hr-application-settings' );
	submit_button();
	echo '</form>';

	echo '<h2>' . esc_html__( 'System status', 'apex-hr-vacancies' ) . '</h2><table class="widefat striped"><tbody>';
	$diagnostics = array(
		__( 'Database-schema version', 'apex-hr-vacancies' ) => get_option( APEX_HR_APPLICATIONS_OPTION, 'Not installed' ),
		__( 'Applications table', 'apex-hr-vacancies' )     => apex_hr_applications_table_exists() ? __( 'Available', 'apex-hr-vacancies' ) : __( 'Unavailable', 'apex-hr-vacancies' ),
		__( 'Private-storage path', 'apex-hr-vacancies' )   => $path,
		__( 'Directory exists', 'apex-hr-vacancies' )       => $exists ? __( 'Yes', 'apex-hr-vacancies' ) : __( 'No', 'apex-hr-vacancies' ),
		__( 'Directory writable', 'apex-hr-vacancies' )     => $writable ? __( 'Yes', 'apex-hr-vacancies' ) : __( 'No', 'apex-hr-vacancies' ),
		__( 'Maximum CV size', 'apex-hr-vacancies' )        => '5 MB',
		__( 'Allowed file types', 'apex-hr-vacancies' )     => 'PDF, DOC, DOCX',
	);
	foreach ( $diagnostics as $label => $value ) {
		echo '<tr><th scope="row">' . esc_html( $label ) . '</th><td>' . esc_html( (string) $value ) . '</td></tr>';
	}
	echo '</tbody></table><p>' . esc_html__( 'Email sending and secure CV downloads are not active in Phase 1.', 'apex-hr-vacancies' ) . '</p></div>';
}

/**
 * Enforce capability, nonce, strict status validation and a prepared update.
 *
 * @return void
 */
function apex_hr_applications_update_status() {
	if ( ! current_user_can( 'manage_apex_hr_applications' ) ) {
		wp_die( esc_html__( 'You are not allowed to manage applications.', 'apex-hr-vacancies' ), '', array( 'response' => 403 ) );
	}

	$application_id = isset( $_POST['application_id'] ) ? absint( $_POST['application_id'] ) : 0;
	check_admin_referer( 'apex_hr_application_status_' . $application_id );

	$status = isset( $_POST['application_status'] ) && is_scalar( $_POST['application_status'] )
		? sanitize_text_field( wp_unslash( (string) $_POST['application_status'] ) )
		: '';
	if ( ! $application_id || ! isset( apex_hr_applications_statuses()[ $status ] ) || ! apex_hr_applications_table_exists() ) {
		wp_safe_redirect( add_query_arg( array( 'page' => 'apex-hr-applications', 'apex_hr_result' => 'error' ), admin_url( 'admin.php' ) ) );
		exit;
	}

	global $wpdb;
	$table = apex_hr_applications_table_name();
	$exists = $wpdb->get_var( $wpdb->prepare( "SELECT id FROM {$table} WHERE id = %d", $application_id ) );
	if ( '' !== $wpdb->last_error || ! $exists ) {
		wp_safe_redirect( add_query_arg( array( 'page' => 'apex-hr-applications', 'apex_hr_result' => 'error' ), admin_url( 'admin.php' ) ) );
		exit;
	}

	$result = $wpdb->update(
		$table,
		array(
			'application_status' => $status,
			'updated_at'         => current_time( 'mysql', true ),
		),
		array( 'id' => $application_id ),
		array( '%s', '%s' ),
		array( '%d' )
	);

	$target = add_query_arg(
		array(
			'page'           => 'apex-hr-applications',
			'application_id' => $application_id,
			'apex_hr_result' => false === $result ? 'error' : 'updated',
		),
		admin_url( 'admin.php' )
	);
	wp_safe_redirect( $target );
	exit;
}
add_action( 'admin_post_apex_hr_update_application_status', 'apex_hr_applications_update_status' );
