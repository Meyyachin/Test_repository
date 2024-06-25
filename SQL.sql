/*
    1. MySQL
        - tbl_posts (id, title, content, posted_date, status) - total 2M records
        - tbl_violations (id, post_id, keyword_id, status) - total 3M records
        - tbl_keywords (id, name, status)
        => Requirement:
        + Please write the MySQL query how can search a text "Attack" to for all posts related to this keyword with limited 20 records per page.
        Answer : 

*/
        SELECT p.id, 
            p.title, 
            p.content, 
            p.posted_date, 
            p.status 
        FROM 
            tbl_posts p
        JOIN 
            tbl_violations v ON p.id = v.post_id
        JOIN 
            tbl_keywords k ON v.keyword_id = k.id
        WHERE 
            k.name = 'Attack'
        AND 
            p.status = 'active' -- Assuming you only want active posts
        AND 
            v.status = 'active' -- Assuming you only want active violations
        LIMIT 20 OFFSET 0; 
/*
    1. MySQL
        - tbl_posts (id, title, content, posted_date, status) - total 2M records
        - tbl_violations (id, post_id, keyword_id, status) - total 3M records
        - tbl_keywords (id, name, status)
        => Requirement:
        + Which fields in database we need set index?
            Answer : 
                Indexes are crucial in optimizing the performance of a MySQL database. In this case,
                Fields to Set Index
                To optimize the performance of the query, you should set indexes on the following fields:

                tbl_posts: id
                tbl_violations: post_id, keyword_id
                tbl_keywords: id, name

                Creating indexes on these fields will help speed up the join operations and the filtering conditions.
*/

        -- tbl_posts indexes
        CREATE INDEX idx_posts_id ON tbl_posts(id);

        -- tbl_violations indexes
        CREATE INDEX idx_violations_post_id ON tbl_violations(post_id);
        CREATE INDEX idx_violations_keyword_id ON tbl_violations(keyword_id);

        -- tbl_keywords indexes
        CREATE INDEX idx_keywords_id ON tbl_keywords(id);
        CREATE INDEX idx_keywords_name ON tbl_keywords(name);

/*
    1. MySQL
        - tbl_posts (id, title, content, posted_date, status) - total 2M records
        - tbl_violations (id, post_id, keyword_id, status) - total 3M records
        - tbl_keywords (id, name, status)
        => Requirement:
        + Do you have any idea on search with BIG DATA?

        Answer : 
        1. Indexing:  We have to ensure that the relevant fields are indexed to speed up search queries.
        2. Partitioning: Partition tables based on date ranges or other relevant criteria to improve query performance.
        3. Caching: We can implement caching mechanisms (e.g., using Redis or Memcached) to store frequently accessed data and reduce the load on the database.
        4. Sharding: We can split the database into smaller, more manageable pieces (shards) to distribute the load across multiple servers.
        5. Denormalization: In some cases, denormalizing the database schema (e.g., storing keyword names directly in the violations table) can reduce the need for complex joins and improve performance.
        6. Use a Search Engine: We have to consider using a dedicated search engine like Elasticsearch or Solr for more advanced search capabilities and better performance with large datasets.

*/