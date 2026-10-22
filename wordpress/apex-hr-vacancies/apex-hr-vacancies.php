<?php
/**
 * Plugin Name: Apex HR Vacancies
 * Description: Vacancy publishing fields and a public, read-only REST API for the Apex HR website.
 * Version: 1.2.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Apex HR
 * License: GPL-2.0-or-later
 * Text Domain: apex-hr-vacancies
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/applications.php';

/**
 * Return the metadata configuration used by the editor and REST API.
 *
 * @return array<string, array<string, mixed>>
 */
function apex_hr_vacancies_meta_fields() {
	return array(
		'apex_hr_vacancy_reference' => array(
			'label'       => __( 'Vacancy reference', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'text',
			'sanitize'    => 'sanitize_text_field',
			'schema'      => array(
				'type'      => 'string',
				'maxLength' => 80,
			),
		),
		'apex_hr_responsibilities' => array(
			'label'       => __( 'Responsibilities', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'textarea',
			'sanitize'    => 'sanitize_textarea_field',
			'schema'      => array( 'type' => 'string' ),
		),
		'apex_hr_requirements' => array(
			'label'       => __( 'Requirements', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'textarea',
			'sanitize'    => 'sanitize_textarea_field',
			'schema'      => array( 'type' => 'string' ),
		),
		'apex_hr_desirable_skills' => array(
			'label'       => __( 'Desirable skills', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'textarea',
			'sanitize'    => 'sanitize_textarea_field',
			'schema'      => array( 'type' => 'string' ),
		),
		'apex_hr_benefits' => array(
			'label'       => __( 'Benefits', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'textarea',
			'sanitize'    => 'sanitize_textarea_field',
			'schema'      => array( 'type' => 'string' ),
		),
		'apex_hr_sector' => array(
			'label'       => __( 'Sector', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'text',
			'sanitize'    => 'sanitize_text_field',
			'schema'      => array( 'type' => 'string', 'maxLength' => 120 ),
		),
		'apex_hr_department' => array(
			'label'       => __( 'Department or job function', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'text',
			'sanitize'    => 'sanitize_text_field',
			'schema'      => array( 'type' => 'string', 'maxLength' => 120 ),
		),
		'apex_hr_location' => array(
			'label'       => __( 'Location', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'text',
			'sanitize'    => 'sanitize_text_field',
			'schema'      => array( 'type' => 'string', 'maxLength' => 160 ),
		),
		'apex_hr_employment_type' => array(
			'label'       => __( 'Employment type', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'select',
			'options'     => array(
				''           => __( 'Select employment type', 'apex-hr-vacancies' ),
				'Permanent'  => __( 'Permanent', 'apex-hr-vacancies' ),
				'Temporary'  => __( 'Temporary', 'apex-hr-vacancies' ),
				'Contract'   => __( 'Contract', 'apex-hr-vacancies' ),
				'Fixed-term' => __( 'Fixed-term', 'apex-hr-vacancies' ),
				'Internship' => __( 'Internship', 'apex-hr-vacancies' ),
				'Part-time'  => __( 'Part-time', 'apex-hr-vacancies' ),
			),
			'sanitize'    => 'apex_hr_vacancies_sanitize_choice',
			'schema'      => array(
				'type' => 'string',
				'enum' => array( '', 'Permanent', 'Temporary', 'Contract', 'Fixed-term', 'Internship', 'Part-time' ),
			),
		),
		'apex_hr_workplace_arrangement' => array(
			'label'       => __( 'Workplace arrangement', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'select',
			'options'     => array(
				''         => __( 'Select workplace arrangement', 'apex-hr-vacancies' ),
				'On-site'  => __( 'On-site', 'apex-hr-vacancies' ),
				'Hybrid'   => __( 'Hybrid', 'apex-hr-vacancies' ),
				'Remote'   => __( 'Remote', 'apex-hr-vacancies' ),
			),
			'sanitize'    => 'apex_hr_vacancies_sanitize_choice',
			'schema'      => array(
				'type' => 'string',
				'enum' => array( '', 'On-site', 'Hybrid', 'Remote' ),
			),
		),
		'apex_hr_seniority' => array(
			'label'       => __( 'Seniority', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'text',
			'sanitize'    => 'sanitize_text_field',
			'schema'      => array( 'type' => 'string', 'maxLength' => 120 ),
		),
		'apex_hr_salary_min' => array(
			'label'       => __( 'Salary minimum', 'apex-hr-vacancies' ),
			'type'        => 'number',
			'control'     => 'number',
			'sanitize'    => 'apex_hr_vacancies_sanitize_salary',
			'schema'      => array( 'type' => 'number', 'minimum' => 0 ),
		),
		'apex_hr_salary_max' => array(
			'label'       => __( 'Salary maximum', 'apex-hr-vacancies' ),
			'type'        => 'number',
			'control'     => 'number',
			'sanitize'    => 'apex_hr_vacancies_sanitize_salary',
			'schema'      => array( 'type' => 'number', 'minimum' => 0 ),
		),
		'apex_hr_salary_currency' => array(
			'label'       => __( 'Salary currency (ISO 4217)', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'text',
			'sanitize'    => 'apex_hr_vacancies_sanitize_currency',
			'schema'      => array(
				'type'      => 'string',
				'pattern'   => '^[A-Z]{3}$',
				'maxLength' => 3,
			),
		),
		'apex_hr_salary_unit' => array(
			'label'       => __( 'Salary period', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'select',
			'options'     => array(
				''      => __( 'Select salary period', 'apex-hr-vacancies' ),
				'HOUR'  => __( 'Per hour', 'apex-hr-vacancies' ),
				'DAY'   => __( 'Per day', 'apex-hr-vacancies' ),
				'WEEK'  => __( 'Per week', 'apex-hr-vacancies' ),
				'MONTH' => __( 'Per month', 'apex-hr-vacancies' ),
				'YEAR'  => __( 'Per year', 'apex-hr-vacancies' ),
			),
			'sanitize'    => 'apex_hr_vacancies_sanitize_choice',
			'schema'      => array(
				'type' => 'string',
				'enum' => array( '', 'HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR' ),
			),
		),
		'apex_hr_salary_display' => array(
			'label'       => __( 'Salary display text', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'text',
			'sanitize'    => 'sanitize_text_field',
			'schema'      => array( 'type' => 'string', 'maxLength' => 160 ),
		),
		'apex_hr_closing_date' => array(
			'label'       => __( 'Closing date', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'date',
			'sanitize'    => 'apex_hr_vacancies_sanitize_date',
			'schema'      => array( 'type' => 'string', 'format' => 'date' ),
		),
		'apex_hr_application_email' => array(
			'label'       => __( 'Application email (optional)', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'email',
			'sanitize'    => 'apex_hr_vacancies_sanitize_email',
			'schema'      => array( 'type' => 'string', 'format' => 'email', 'maxLength' => 254 ),
		),
		'apex_hr_featured' => array(
			'label'       => __( 'Featured vacancy', 'apex-hr-vacancies' ),
			'type'        => 'boolean',
			'control'     => 'checkbox',
			'sanitize'    => 'rest_sanitize_boolean',
			'schema'      => array( 'type' => 'boolean' ),
		),
		'apex_hr_vacancy_status' => array(
			'label'       => __( 'Vacancy status', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'select',
			'options'     => array(
				'Open'   => __( 'Open', 'apex-hr-vacancies' ),
				'Closed' => __( 'Closed', 'apex-hr-vacancies' ),
				'Filled' => __( 'Filled', 'apex-hr-vacancies' ),
			),
			'default'     => 'Open',
			'sanitize'    => 'apex_hr_vacancies_sanitize_choice',
			'schema'      => array( 'type' => 'string', 'enum' => array( 'Open', 'Closed', 'Filled' ) ),
		),
		'apex_hr_seo_title' => array(
			'label'       => __( 'SEO title', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'text',
			'sanitize'    => 'sanitize_text_field',
			'schema'      => array( 'type' => 'string', 'maxLength' => 160 ),
		),
		'apex_hr_meta_description' => array(
			'label'       => __( 'Meta description', 'apex-hr-vacancies' ),
			'type'        => 'string',
			'control'     => 'textarea',
			'sanitize'    => 'sanitize_textarea_field',
			'schema'      => array( 'type' => 'string', 'maxLength' => 320 ),
		),
	);
}

/**
 * Sanitize a value against a registered controlled option set.
 *
 * @param mixed  $value     Incoming metadata value.
 * @param string $meta_key  Metadata key.
 * @param int    $object_id Post ID.
 * @return string
 */
function apex_hr_vacancies_sanitize_choice( $value, $meta_key = '', $object_id = 0 ) {
	$fields = apex_hr_vacancies_meta_fields();
	$value  = is_scalar( $value ) ? sanitize_text_field( (string) $value ) : '';

	if ( ! isset( $fields[ $meta_key ]['options'][ $value ] ) ) {
		return '';
	}

	return $value;
}

/**
 * Sanitize non-negative salary values, retaining the REST numeric type.
 *
 * @param mixed  $value     Incoming metadata value.
 * @param string $meta_key  Metadata key.
 * @param int    $object_id Post ID.
 * @return float|string
 */
function apex_hr_vacancies_sanitize_salary( $value, $meta_key = '', $object_id = 0 ) {
	if ( '' === $value || null === $value ) {
		return '';
	}

	if ( ! is_scalar( $value ) || ! is_numeric( $value ) || (float) $value < 0 ) {
		return '';
	}

	return (float) $value;
}

/**
 * Sanitize and validate an ISO 4217 currency code.
 *
 * @param mixed  $value     Incoming metadata value.
 * @param string $meta_key  Metadata key.
 * @param int    $object_id Post ID.
 * @return string
 */
function apex_hr_vacancies_sanitize_currency( $value, $meta_key = '', $object_id = 0 ) {
	$value = is_scalar( $value ) ? strtoupper( sanitize_text_field( (string) $value ) ) : '';
	return preg_match( '/^[A-Z]{3}$/', $value ) ? $value : '';
}

/**
 * Sanitize a date to an exact YYYY-MM-DD value.
 *
 * @param mixed  $value     Incoming metadata value.
 * @param string $meta_key  Metadata key.
 * @param int    $object_id Post ID.
 * @return string
 */
function apex_hr_vacancies_sanitize_date( $value, $meta_key = '', $object_id = 0 ) {
	if ( ! is_scalar( $value ) ) {
		return '';
	}

	$value = sanitize_text_field( (string) $value );
	$date  = DateTime::createFromFormat( '!Y-m-d', $value );
	$errors = DateTime::getLastErrors();

	if ( ! $date || ( false !== $errors && ( $errors['warning_count'] || $errors['error_count'] ) ) || $date->format( 'Y-m-d' ) !== $value ) {
		return '';
	}

	return $value;
}

/**
 * Sanitize optional application email addresses.
 *
 * @param mixed  $value     Incoming metadata value.
 * @param string $meta_key  Metadata key.
 * @param int    $object_id Post ID.
 * @return string
 */
function apex_hr_vacancies_sanitize_email( $value, $meta_key = '', $object_id = 0 ) {
	$value = is_scalar( $value ) ? sanitize_email( (string) $value ) : '';
	return is_email( $value ) ? $value : '';
}

/**
 * Register the vacancy content type and its REST-visible metadata.
 *
 * @return void
 */
function apex_hr_vacancies_register_content_type() {
	$labels = array(
		'name'                  => __( 'Vacancies', 'apex-hr-vacancies' ),
		'singular_name'         => __( 'Vacancy', 'apex-hr-vacancies' ),
		'menu_name'             => __( 'Vacancies', 'apex-hr-vacancies' ),
		'name_admin_bar'        => __( 'Vacancy', 'apex-hr-vacancies' ),
		'add_new'               => __( 'Add Vacancy', 'apex-hr-vacancies' ),
		'add_new_item'          => __( 'Add New Vacancy', 'apex-hr-vacancies' ),
		'edit_item'             => __( 'Edit Vacancy', 'apex-hr-vacancies' ),
		'new_item'              => __( 'New Vacancy', 'apex-hr-vacancies' ),
		'view_item'             => __( 'View Vacancy', 'apex-hr-vacancies' ),
		'view_items'            => __( 'View Vacancies', 'apex-hr-vacancies' ),
		'search_items'          => __( 'Search Vacancies', 'apex-hr-vacancies' ),
		'not_found'             => __( 'No vacancies found.', 'apex-hr-vacancies' ),
		'not_found_in_trash'    => __( 'No vacancies found in Trash.', 'apex-hr-vacancies' ),
		'all_items'             => __( 'All Vacancies', 'apex-hr-vacancies' ),
		'archives'              => __( 'Vacancy Archives', 'apex-hr-vacancies' ),
		'insert_into_item'      => __( 'Insert into vacancy', 'apex-hr-vacancies' ),
		'uploaded_to_this_item' => __( 'Uploaded to this vacancy', 'apex-hr-vacancies' ),
	);

	register_post_type(
		'vacancy',
		array(
			'labels'              => $labels,
			'public'              => true,
			'publicly_queryable'  => true,
			'exclude_from_search' => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_rest'        => true,
			'rest_base'           => 'vacancies',
			'has_archive'         => false,
			'rewrite'             => false,
			'query_var'           => true,
			'capability_type'     => 'post',
			'map_meta_cap'        => true,
			'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'author', 'custom-fields' ),
		)
	);

	foreach ( apex_hr_vacancies_meta_fields() as $key => $field ) {
		$meta_args = array(
			'type'              => $field['type'],
			'single'            => true,
			'show_in_rest'      => array( 'schema' => $field['schema'] ),
			'sanitize_callback' => $field['sanitize'],
			'auth_callback'     => 'apex_hr_vacancies_meta_auth',
		);

		if ( isset( $field['default'] ) ) {
			$meta_args['default'] = $field['default'];
		}

		register_post_meta( 'vacancy', $key, $meta_args );
	}
}
add_action( 'init', 'apex_hr_vacancies_register_content_type' );

/**
 * Restrict metadata editing to users allowed to edit its vacancy.
 *
 * @param bool   $allowed  Whether editing is already allowed.
 * @param string $meta_key Metadata key.
 * @param int    $post_id  Vacancy ID.
 * @return bool
 */
function apex_hr_vacancies_meta_auth( $allowed, $meta_key, $post_id ) {
	return $post_id && current_user_can( 'edit_post', $post_id );
}

/**
 * Add the vacancy details editor panel.
 *
 * @return void
 */
function apex_hr_vacancies_add_meta_box() {
	add_meta_box(
		'apex-hr-vacancy-details',
		__( 'Vacancy details', 'apex-hr-vacancies' ),
		'apex_hr_vacancies_render_meta_box',
		'vacancy',
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes_vacancy', 'apex_hr_vacancies_add_meta_box' );

/**
 * Render the editor fields with escaped values and a per-form nonce.
 *
 * @param WP_Post $post Current vacancy post.
 * @return void
 */
function apex_hr_vacancies_render_meta_box( $post ) {
	wp_nonce_field( 'apex_hr_save_vacancy', 'apex_hr_vacancy_nonce' );
	echo '<p>' . esc_html__( 'Use the standard editor for the full job description, Excerpt for the short summary, and the permalink controls for the URL slug.', 'apex-hr-vacancies' ) . '</p>';

	foreach ( apex_hr_vacancies_meta_fields() as $key => $field ) {
		$value = get_post_meta( $post->ID, $key, true );
		if ( '' === $value && isset( $field['default'] ) ) {
			$value = $field['default'];
		}

		$input_id = 'apex-hr-' . esc_attr( $key );
		echo '<p class="apex-hr-vacancy-field">';
		if ( 'checkbox' === $field['control'] ) {
			echo '<label for="' . esc_attr( $input_id ) . '">';
			echo '<input type="checkbox" id="' . esc_attr( $input_id ) . '" name="apex_hr_vacancy[' . esc_attr( $key ) . ']" value="1" ' . checked( (bool) $value, true, false ) . ' />';
			echo ' ' . esc_html( $field['label'] ) . '</label>';
		} else {
			echo '<label for="' . esc_attr( $input_id ) . '">' . esc_html( $field['label'] ) . '</label><br />';

			if ( 'textarea' === $field['control'] ) {
				echo '<textarea class="widefat" rows="4" id="' . esc_attr( $input_id ) . '" name="apex_hr_vacancy[' . esc_attr( $key ) . ']">' . esc_textarea( (string) $value ) . '</textarea>';
			} elseif ( 'select' === $field['control'] ) {
				echo '<select class="widefat" id="' . esc_attr( $input_id ) . '" name="apex_hr_vacancy[' . esc_attr( $key ) . ']">';
				foreach ( $field['options'] as $option_value => $option_label ) {
					echo '<option value="' . esc_attr( $option_value ) . '" ' . selected( (string) $value, (string) $option_value, false ) . '>' . esc_html( $option_label ) . '</option>';
				}
				echo '</select>';
			} else {
				$input_type = in_array( $field['control'], array( 'number', 'date', 'email' ), true ) ? $field['control'] : 'text';
				$step       = 'number' === $input_type ? ' step="0.01" min="0"' : '';
				echo '<input class="widefat" type="' . esc_attr( $input_type ) . '" id="' . esc_attr( $input_id ) . '" name="apex_hr_vacancy[' . esc_attr( $key ) . ']" value="' . esc_attr( (string) $value ) . '"' . $step . ' />';
			}
		}
		echo '</p>';
	}
}

/**
 * Validate relationships between salary amounts.
 *
 * @param mixed $minimum Salary minimum.
 * @param mixed $maximum Salary maximum.
 * @return bool
 */
function apex_hr_vacancies_salary_range_is_valid( $minimum, $maximum ) {
	return '' === $minimum || '' === $maximum || (float) $minimum <= (float) $maximum;
}

/**
 * Save submitted vacancy metadata after nonce, capability, and value checks.
 *
 * @param int     $post_id Post ID.
 * @param WP_Post $post    Post object.
 * @return void
 */
function apex_hr_vacancies_save_meta( $post_id, $post ) {
	if ( ! isset( $_POST['apex_hr_vacancy_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['apex_hr_vacancy_nonce'] ) ), 'apex_hr_save_vacancy' ) ) {
		return;
	}

	if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || wp_is_post_revision( $post_id ) || 'vacancy' !== $post->post_type ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$submitted = isset( $_POST['apex_hr_vacancy'] ) && is_array( $_POST['apex_hr_vacancy'] ) ? wp_unslash( $_POST['apex_hr_vacancy'] ) : array();
	$values    = array();

	foreach ( apex_hr_vacancies_meta_fields() as $key => $field ) {
		if ( 'checkbox' === $field['control'] ) {
			$values[ $key ] = isset( $submitted[ $key ] ) ? rest_sanitize_boolean( $submitted[ $key ] ) : false;
			continue;
		}

		if ( ! isset( $submitted[ $key ] ) || ! is_scalar( $submitted[ $key ] ) ) {
			$values[ $key ] = isset( $field['default'] ) ? $field['default'] : '';
			continue;
		}

		$raw_value        = (string) $submitted[ $key ];
		$values[ $key ]   = call_user_func( $field['sanitize'], $raw_value, $key, $post_id );
	}

	if ( ! apex_hr_vacancies_salary_range_is_valid( $values['apex_hr_salary_min'], $values['apex_hr_salary_max'] ) ) {
		$values['apex_hr_salary_min'] = get_post_meta( $post_id, 'apex_hr_salary_min', true );
		$values['apex_hr_salary_max'] = get_post_meta( $post_id, 'apex_hr_salary_max', true );
		set_transient(
			'apex_hr_vacancy_validation_' . get_current_user_id(),
			__( 'Salary minimum cannot exceed salary maximum. The previous salary range was kept.', 'apex-hr-vacancies' ),
			MINUTE_IN_SECONDS
		);
	}

	foreach ( $values as $key => $value ) {
		if ( '' === $value ) {
			delete_post_meta( $post_id, $key );
		} else {
			update_post_meta( $post_id, $key, $value );
		}
	}

	if ( ! get_post_meta( $post_id, 'apex_hr_vacancy_status', true ) ) {
		update_post_meta( $post_id, 'apex_hr_vacancy_status', 'Open' );
	}
}
add_action( 'save_post_vacancy', 'apex_hr_vacancies_save_meta', 10, 2 );

/**
 * Enforce cross-field salary validation on authenticated REST writes.
 *
 * @param WP_Post|WP_Error $prepared_post Prepared post or prior error.
 * @param WP_REST_Request  $request       REST request.
 * @return WP_Post|WP_Error
 */
function apex_hr_vacancies_validate_rest_write( $prepared_post, $request ) {
	if ( is_wp_error( $prepared_post ) ) {
		return $prepared_post;
	}

	$submitted = $request->get_param( 'meta' );
	if ( ! is_array( $submitted ) ) {
		return $prepared_post;
	}

	$post_id = absint( $request->get_param( 'id' ) );
	$minimum = array_key_exists( 'apex_hr_salary_min', $submitted ) ? apex_hr_vacancies_sanitize_salary( $submitted['apex_hr_salary_min'] ) : get_post_meta( $post_id, 'apex_hr_salary_min', true );
	$maximum = array_key_exists( 'apex_hr_salary_max', $submitted ) ? apex_hr_vacancies_sanitize_salary( $submitted['apex_hr_salary_max'] ) : get_post_meta( $post_id, 'apex_hr_salary_max', true );

	if ( ! apex_hr_vacancies_salary_range_is_valid( $minimum, $maximum ) ) {
		return new WP_Error(
			'apex_hr_invalid_salary_range',
			__( 'Salary minimum cannot exceed salary maximum.', 'apex-hr-vacancies' ),
			array( 'status' => 400 )
		);
	}

	return $prepared_post;
}
add_filter( 'rest_pre_insert_vacancy', 'apex_hr_vacancies_validate_rest_write', 10, 2 );

/**
 * Limit anonymous vacancy collection requests to published posts only.
 *
 * WordPress already applies this rule to ordinary public queries; enforcing
 * it here also prevents a caller-supplied status parameter from widening
 * the public REST collection.
 *
 * @param array           $args    Query arguments.
 * @param WP_REST_Request $request REST request.
 * @return array
 */
function apex_hr_vacancies_public_rest_query( $args, $request ) {
	if ( ! is_user_logged_in() ) {
		$args['post_status'] = 'publish';
	}

	return $args;
}
add_filter( 'rest_vacancy_query', 'apex_hr_vacancies_public_rest_query', 10, 2 );

/**
 * Extra guard against accidentally preparing an unpublished post publicly.
 *
 * @param WP_REST_Response $response REST response.
 * @param WP_Post          $post     Vacancy post.
 * @param WP_REST_Request  $request  REST request.
 * @return WP_REST_Response|WP_Error
 */
function apex_hr_vacancies_public_rest_item_guard( $response, $post, $request ) {
	if ( ! is_user_logged_in() && 'publish' !== $post->post_status ) {
		return new WP_Error( 'rest_vacancy_not_found', __( 'Vacancy not found.', 'apex-hr-vacancies' ), array( 'status' => 404 ) );
	}

	return $response;
}
add_filter( 'rest_prepare_vacancy', 'apex_hr_vacancies_public_rest_item_guard', 10, 3 );

/**
 * Keep the WordPress CMS origin out of visitor-facing vacancy URLs.
 *
 * @return void
 */
function apex_hr_vacancies_hide_public_templates() {
	if ( current_user_can( 'edit_posts' ) || ( ! is_singular( 'vacancy' ) && ! is_post_type_archive( 'vacancy' ) ) ) {
		return;
	}

	global $wp_query;
	$wp_query->set_404();
	status_header( 404 );
	nocache_headers();

	$template = get_404_template();
	if ( $template ) {
		include $template;
	} else {
		wp_die( esc_html__( 'Vacancy pages are served on the Apex HR website.', 'apex-hr-vacancies' ), '', array( 'response' => 404 ) );
	}
	exit;
}
add_action( 'template_redirect', 'apex_hr_vacancies_hide_public_templates', 0 );

/**
 * Display any validation message from the last vacancy save.
 *
 * @return void
 */
function apex_hr_vacancies_admin_notice() {
	if ( ! is_admin() || ! get_current_user_id() ) {
		return;
	}

	$key     = 'apex_hr_vacancy_validation_' . get_current_user_id();
	$message = get_transient( $key );
	if ( ! $message ) {
		return;
	}

	delete_transient( $key );
	echo '<div class="notice notice-error is-dismissible"><p>' . esc_html( $message ) . '</p></div>';
}
add_action( 'admin_notices', 'apex_hr_vacancies_admin_notice' );

/**
 * Exclude vacancies from WordPress sitemaps; the public Next.js site owns
 * the canonical vacancy sitemap.
 *
 * @param array<string, WP_Post_Type> $post_types Public sitemap post types.
 * @return array
 */
function apex_hr_vacancies_exclude_core_sitemap( $post_types ) {
	unset( $post_types['vacancy'] );
	return $post_types;
}
add_filter( 'wp_sitemaps_post_types', 'apex_hr_vacancies_exclude_core_sitemap' );

/**
 * Keep Yoast's generated sitemap on the WordPress CMS origin article-only.
 *
 * @param array<int, string> $post_types Post types excluded from Yoast sitemaps.
 * @return array<int, string>
 */
function apex_hr_vacancies_exclude_yoast_sitemap( $post_types ) {
	if ( ! is_array( $post_types ) ) {
		$post_types = array();
	}

	if ( ! in_array( 'vacancy', $post_types, true ) ) {
		$post_types[] = 'vacancy';
	}
	return $post_types;
}
add_filter( 'wpseo_exclude_from_sitemap_by_post_type', 'apex_hr_vacancies_exclude_yoast_sitemap' );
