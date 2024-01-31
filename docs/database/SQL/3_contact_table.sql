-- Create the table
 CREATE TABLE contact (
 id SERIAL PRIMARY KEY,
 name VARCHAR (255),
 email VARCHAR (255),
 message TEXT,
 src VARCHAR (255),
 marketing BOOLEAN DEFAULT false,
 dt TIMESTAMP DEFAULT NOW()
 );
-- enable RLS
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
-- Policy Insert for public 
CREATE POLICY "Enable insert for all public roles" ON "public"."contact"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true)
-- Read access to service role only
CREATE POLICY "Enable read access for service role" ON "public"."contact"
AS PERMISSIVE FOR SELECT
TO service_role
USING (true)

