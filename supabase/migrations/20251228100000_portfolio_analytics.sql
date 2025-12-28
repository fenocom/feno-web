-- Portfolio Analytics Tables
-- Stores aggregated analytics data for published portfolios

-- Page views aggregated by hour for the current day, then rolled up to daily
CREATE TABLE portfolio_page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES user_portfolios(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    hour SMALLINT, -- NULL for daily aggregates, 0-23 for hourly
    views INTEGER NOT NULL DEFAULT 0,
    unique_visitors INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(portfolio_id, date, hour)
);

-- Country stats aggregated by day
CREATE TABLE portfolio_geo_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES user_portfolios(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    country_code CHAR(2) NOT NULL, -- ISO 3166-1 alpha-2
    country_name VARCHAR(100),
    views INTEGER NOT NULL DEFAULT 0,
    unique_visitors INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(portfolio_id, date, country_code)
);

-- Click heatmap data - aggregated by element/position
CREATE TABLE portfolio_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES user_portfolios(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    -- Position as percentage of viewport (0-100)
    x_percent SMALLINT NOT NULL CHECK (x_percent >= 0 AND x_percent <= 100),
    y_percent SMALLINT NOT NULL CHECK (y_percent >= 0 AND y_percent <= 100),
    -- Element info
    element_tag VARCHAR(50),
    element_text VARCHAR(255), -- First 255 chars of text content
    element_href VARCHAR(500), -- For links
    -- Aggregated count
    click_count INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Referrer stats
CREATE TABLE portfolio_referrers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES user_portfolios(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    referrer_domain VARCHAR(255),
    referrer_url VARCHAR(1000),
    views INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(portfolio_id, date, referrer_domain)
);

-- Device/browser stats
CREATE TABLE portfolio_device_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES user_portfolios(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    device_type VARCHAR(20) NOT NULL, -- desktop, mobile, tablet
    browser VARCHAR(50),
    os VARCHAR(50),
    views INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(portfolio_id, date, device_type, browser, os)
);

-- Visitor sessions for unique visitor tracking (short-lived, cleaned up daily)
CREATE TABLE portfolio_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES user_portfolios(id) ON DELETE CASCADE,
    visitor_hash VARCHAR(64) NOT NULL, -- Hash of IP + User-Agent for privacy
    first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    page_views INTEGER NOT NULL DEFAULT 1,
    UNIQUE(portfolio_id, visitor_hash)
);

-- Indexes for efficient queries
CREATE INDEX idx_page_views_portfolio_date ON portfolio_page_views(portfolio_id, date DESC);
CREATE INDEX idx_geo_stats_portfolio_date ON portfolio_geo_stats(portfolio_id, date DESC);
CREATE INDEX idx_clicks_portfolio_date ON portfolio_clicks(portfolio_id, date DESC);
CREATE INDEX idx_referrers_portfolio_date ON portfolio_referrers(portfolio_id, date DESC);
CREATE INDEX idx_device_stats_portfolio_date ON portfolio_device_stats(portfolio_id, date DESC);
CREATE INDEX idx_sessions_portfolio ON portfolio_sessions(portfolio_id);
CREATE INDEX idx_sessions_last_seen ON portfolio_sessions(last_seen);

-- Function to increment page views (upsert pattern)
CREATE OR REPLACE FUNCTION increment_page_view(
    p_portfolio_id UUID,
    p_date DATE,
    p_hour SMALLINT,
    p_is_unique BOOLEAN DEFAULT FALSE
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO portfolio_page_views (portfolio_id, date, hour, views, unique_visitors)
    VALUES (p_portfolio_id, p_date, p_hour, 1, CASE WHEN p_is_unique THEN 1 ELSE 0 END)
    ON CONFLICT (portfolio_id, date, hour)
    DO UPDATE SET
        views = portfolio_page_views.views + 1,
        unique_visitors = portfolio_page_views.unique_visitors + CASE WHEN p_is_unique THEN 1 ELSE 0 END,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to increment geo stats
CREATE OR REPLACE FUNCTION increment_geo_stat(
    p_portfolio_id UUID,
    p_date DATE,
    p_country_code CHAR(2),
    p_country_name VARCHAR(100),
    p_is_unique BOOLEAN DEFAULT FALSE
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO portfolio_geo_stats (portfolio_id, date, country_code, country_name, views, unique_visitors)
    VALUES (p_portfolio_id, p_date, p_country_code, p_country_name, 1, CASE WHEN p_is_unique THEN 1 ELSE 0 END)
    ON CONFLICT (portfolio_id, date, country_code)
    DO UPDATE SET
        views = portfolio_geo_stats.views + 1,
        unique_visitors = portfolio_geo_stats.unique_visitors + CASE WHEN p_is_unique THEN 1 ELSE 0 END,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to record click
CREATE OR REPLACE FUNCTION record_click(
    p_portfolio_id UUID,
    p_date DATE,
    p_x_percent SMALLINT,
    p_y_percent SMALLINT,
    p_element_tag VARCHAR(50),
    p_element_text VARCHAR(255),
    p_element_href VARCHAR(500)
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO portfolio_clicks (
        portfolio_id, date, x_percent, y_percent,
        element_tag, element_text, element_href, click_count
    )
    VALUES (
        p_portfolio_id, p_date, p_x_percent, p_y_percent,
        p_element_tag, p_element_text, p_element_href, 1
    );
END;
$$ LANGUAGE plpgsql;

-- Function to increment referrer stats
CREATE OR REPLACE FUNCTION increment_referrer_stat(
    p_portfolio_id UUID,
    p_date DATE,
    p_referrer_domain VARCHAR(255),
    p_referrer_url VARCHAR(1000)
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO portfolio_referrers (portfolio_id, date, referrer_domain, referrer_url, views)
    VALUES (p_portfolio_id, p_date, p_referrer_domain, p_referrer_url, 1)
    ON CONFLICT (portfolio_id, date, referrer_domain)
    DO UPDATE SET
        views = portfolio_referrers.views + 1,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to increment device stats
CREATE OR REPLACE FUNCTION increment_device_stat(
    p_portfolio_id UUID,
    p_date DATE,
    p_device_type VARCHAR(20),
    p_browser VARCHAR(50),
    p_os VARCHAR(50)
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO portfolio_device_stats (portfolio_id, date, device_type, browser, os, views)
    VALUES (p_portfolio_id, p_date, p_device_type, p_browser, p_os, 1)
    ON CONFLICT (portfolio_id, date, device_type, browser, os)
    DO UPDATE SET
        views = portfolio_device_stats.views + 1,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to check/create session and return if unique
CREATE OR REPLACE FUNCTION check_visitor_session(
    p_portfolio_id UUID,
    p_visitor_hash VARCHAR(64)
)
RETURNS BOOLEAN AS $$
DECLARE
    is_new BOOLEAN;
BEGIN
    INSERT INTO portfolio_sessions (portfolio_id, visitor_hash)
    VALUES (p_portfolio_id, p_visitor_hash)
    ON CONFLICT (portfolio_id, visitor_hash)
    DO UPDATE SET
        last_seen = NOW(),
        page_views = portfolio_sessions.page_views + 1;

    -- Check if this was a new insert (unique visitor)
    GET DIAGNOSTICS is_new = ROW_COUNT;
    RETURN is_new AND (SELECT page_views = 1 FROM portfolio_sessions
                       WHERE portfolio_id = p_portfolio_id AND visitor_hash = p_visitor_hash);
END;
$$ LANGUAGE plpgsql;

-- Cleanup old sessions (run daily via cron)
CREATE OR REPLACE FUNCTION cleanup_old_sessions()
RETURNS VOID AS $$
BEGIN
    DELETE FROM portfolio_sessions
    WHERE last_seen < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- RLS Policies
ALTER TABLE portfolio_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_geo_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_referrers ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_device_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only view their own portfolio analytics
CREATE POLICY "Users can view own portfolio analytics" ON portfolio_page_views
    FOR SELECT USING (
        portfolio_id IN (SELECT id FROM user_portfolios WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view own geo stats" ON portfolio_geo_stats
    FOR SELECT USING (
        portfolio_id IN (SELECT id FROM user_portfolios WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view own clicks" ON portfolio_clicks
    FOR SELECT USING (
        portfolio_id IN (SELECT id FROM user_portfolios WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view own referrers" ON portfolio_referrers
    FOR SELECT USING (
        portfolio_id IN (SELECT id FROM user_portfolios WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view own device stats" ON portfolio_device_stats
    FOR SELECT USING (
        portfolio_id IN (SELECT id FROM user_portfolios WHERE user_id = auth.uid())
    );

-- Service role can insert/update all (for API)
CREATE POLICY "Service can manage page views" ON portfolio_page_views
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service can manage geo stats" ON portfolio_geo_stats
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service can manage clicks" ON portfolio_clicks
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service can manage referrers" ON portfolio_referrers
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service can manage device stats" ON portfolio_device_stats
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service can manage sessions" ON portfolio_sessions
    FOR ALL USING (true) WITH CHECK (true);
