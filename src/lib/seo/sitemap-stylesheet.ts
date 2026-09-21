/**
 * Shared XSL stylesheet for every sitemap in the site (the sitemap index
 * and all six child sitemaps), served at /sitemap.xsl by
 * src/app/sitemap.xsl/route.ts. Browsers apply this client-side via the
 * `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>` instruction
 * each sitemap document carries (see src/lib/seo/xml-sitemap.ts) so a
 * human visiting a raw sitemap URL sees a readable, Apex HR–branded page
 * instead of an unstyled XML tree. It has no effect on how search engines
 * parse the underlying XML — crawlers read the `<urlset>`/`<sitemapindex>`
 * data directly and ignore the stylesheet processing instruction.
 *
 * XSLT 1.0 only (the only version real browsers implement natively).
 * Brand tokens (colours, fonts) are copied from DESIGN.md's CSS custom
 * properties rather than imported, since this stylesheet is served as a
 * standalone static string with no build-time access to globals.css.
 */
export const sitemapStylesheet = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

<xsl:template match="/">
  <html lang="en-GB">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>
      <xsl:choose>
        <xsl:when test="sm:sitemapindex">XML Sitemap Index | Apex HR</xsl:when>
        <xsl:otherwise>XML Sitemap | Apex HR</xsl:otherwise>
      </xsl:choose>
    </title>
    <style>
      :root {
        --color-navy: #2b2733;
        --color-gold: #b8966b;
        --color-gold-ink: #7a5a34;
        --color-cream: #faf6f0;
        --color-peach: #f0dccb;
        --color-slate: #6e6a6e;
        --color-white: #ffffff;
        --color-row-alt: #f6f2ec;
        --font-display: Cambria, Georgia, "Times New Roman", serif;
        --font-body: Calibri, Arial, Helvetica, "Segoe UI", sans-serif;
      }
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        padding: 0;
        background: var(--color-cream);
        color: var(--color-navy);
        font-family: var(--font-body);
      }
      .wrap {
        max-width: 1100px;
        margin: 0 auto;
        padding: 32px 20px 64px;
      }
      .card {
        background: var(--color-white);
        border: 1px solid var(--color-peach);
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(43, 39, 51, 0.08);
        padding: 32px clamp(16px, 4vw, 48px) 40px;
      }
      .brand {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 24px;
      }
      .brand-mark {
        font-family: var(--font-display);
        font-size: 28px;
        font-weight: 700;
        letter-spacing: -0.01em;
      }
      .brand-mark .hr { color: var(--color-gold-ink); margin-left: 4px; }
      .brand-tagline {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--color-slate);
      }
      h1 {
        font-family: var(--font-display);
        font-size: clamp(22px, 3.4vw, 30px);
        margin: 18px 0 8px;
        color: var(--color-navy);
      }
      p.intro {
        color: var(--color-slate);
        font-size: 15px;
        line-height: 1.6;
        max-width: 70ch;
        margin: 0 0 8px;
      }
      p.count {
        font-weight: 600;
        color: var(--color-navy);
        font-size: 15px;
        margin: 0 0 24px;
      }
      .table-scroll {
        overflow-x: auto;
        border: 1px solid var(--color-peach);
        border-radius: 8px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        min-width: 480px;
      }
      thead th {
        background: var(--color-navy);
        color: var(--color-cream);
        text-align: left;
        padding: 12px 16px;
        font-weight: 600;
        font-size: 12px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        white-space: nowrap;
      }
      tbody td {
        padding: 10px 16px;
        border-top: 1px solid var(--color-peach);
        vertical-align: top;
        word-break: break-word;
      }
      tbody tr:nth-child(even) { background: var(--color-row-alt); }
      tbody tr:hover { background: var(--color-peach); }
      td.col-index { color: var(--color-slate); width: 1%; white-space: nowrap; }
      td.col-lastmod { color: var(--color-slate); width: 1%; white-space: nowrap; }
      td.col-images img {
        display: block;
        max-width: 72px;
        max-height: 48px;
        border-radius: 4px;
        object-fit: cover;
      }
      a { color: var(--color-gold-ink); text-decoration: none; word-break: break-all; }
      a:hover { color: var(--color-navy); text-decoration: underline; }
      footer {
        margin-top: 28px;
        padding-top: 16px;
        border-top: 1px solid var(--color-peach);
        color: var(--color-slate);
        font-size: 12.5px;
        line-height: 1.6;
      }
      footer a { color: var(--color-gold-ink); }
      @media (max-width: 560px) {
        .wrap { padding: 20px 12px 48px; }
        .card { padding: 24px 16px 32px; }
        table { font-size: 13px; }
        thead th, tbody td { padding: 8px 10px; }
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <div class="brand">
          <span class="brand-mark">Apex<span class="hr">HR</span></span>
          <span class="brand-tagline">Global People Partner</span>
        </div>

        <xsl:choose>
          <xsl:when test="sm:sitemapindex">
            <h1>XML Sitemap Index</h1>
            <p class="intro">Generated by Apex HR, this XML Sitemap is intended for consumption by search engines. It lists every sitemap that makes up the full Apex HR sitemap.</p>
            <p class="count">
              This Sitemap Index file contains <xsl:value-of select="count(sm:sitemapindex/sm:sitemap)"/> sitemaps.
            </p>
            <div class="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sitemap</th>
                    <th>Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sm:sitemapindex/sm:sitemap">
                    <tr>
                      <td class="col-index"><xsl:value-of select="position()"/></td>
                      <td>
                        <a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a>
                      </td>
                      <td class="col-lastmod">
                        <xsl:choose>
                          <xsl:when test="sm:lastmod">
                            <xsl:value-of select="substring(sm:lastmod, 1, 10)"/>
                          </xsl:when>
                          <xsl:otherwise>&#8212;</xsl:otherwise>
                        </xsl:choose>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:when>

          <xsl:when test="sm:urlset">
            <h1>XML Sitemap</h1>
            <p class="intro">Generated by Apex HR, this XML Sitemap is intended for consumption by search engines.</p>
            <p class="count">
              This XML Sitemap contains <xsl:value-of select="count(sm:urlset/sm:url)"/> URLs.
            </p>
            <div class="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>URL</th>
                    <xsl:if test="sm:urlset/sm:url/image:image">
                      <th>Images</th>
                    </xsl:if>
                    <th>Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sm:urlset/sm:url">
                    <tr>
                      <td class="col-index"><xsl:value-of select="position()"/></td>
                      <td>
                        <a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a>
                      </td>
                      <xsl:if test="/sm:urlset/sm:url/image:image">
                        <td class="col-images">
                          <xsl:choose>
                            <xsl:when test="image:image/image:loc">
                              <img src="{image:image/image:loc}" alt="{image:image/image:title}"/>
                            </xsl:when>
                            <xsl:otherwise>&#8212;</xsl:otherwise>
                          </xsl:choose>
                        </td>
                      </xsl:if>
                      <td class="col-lastmod">
                        <xsl:choose>
                          <xsl:when test="sm:lastmod">
                            <xsl:value-of select="substring(sm:lastmod, 1, 10)"/>
                          </xsl:when>
                          <xsl:otherwise>&#8212;</xsl:otherwise>
                        </xsl:choose>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:when>
        </xsl:choose>

        <footer>
          <p>
            <a href="https://www.apexhrllc.co.uk/">www.apexhrllc.co.uk</a> &#8212;
            this page is an XML sitemap, generated by Apex HR for search engines. If you reached it by mistake,
            you may want to visit the <a href="https://www.apexhrllc.co.uk/">Apex HR homepage</a> instead.
          </p>
        </footer>
      </div>
    </div>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
`;
