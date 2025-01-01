import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1735542161568 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /**
     * the enum at src/common/enums/role.enum.ts
     */
    await queryRunner.query(`
        CREATE TYPE user_role AS ENUM ('superadmin', 'admin', 'participant');
    `);

    await queryRunner.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE, -- Foreign key referencing organizations
            name VARCHAR(128) NOT NULL,
            username VARCHAR(128) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL, -- Store password securely (e.g., bcrypt hash)
            role user_role NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);

    /**
     * NOTES
     *
     * -- 1. Create the new enum type
     * CREATE TYPE user_role_new AS ENUM ('admin', 'editor', 'viewer', 'manager');
     *
     * -- 2. Alter the table
     * ALTER TABLE users ADD COLUMN role_new user_role_new;
     *
     * -- 3. Update the new column (handle potential renames here)
     * UPDATE users SET role_new = role::text::user_role_new; -- The ::text:: is crucial for casting
     *
     * -- 4. Drop the old column
     * ALTER TABLE users DROP COLUMN role;
     *
     * -- 5. Rename the new column
     * ALTER TABLE users RENAME COLUMN role_new TO role;
     *
     * -- 6. Drop the old enum type
     * DROP TYPE user_role;
     *
     * --Rename new enum type
     * ALTER TYPE user_role_new RENAME TO user_role;
     *
     * UPDATE users SET role_new =
     * CASE role
     *      WHEN 'author' THEN 'editor'::user_role_new
     *      ELSE role::text::user_role_new
     * END;
     *
     *
     *
     */
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.query(`DROP TYPE user_role`);
  }
}
