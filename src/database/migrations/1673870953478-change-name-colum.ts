import { MigrationInterface, QueryRunner } from "typeorm";

export class changeNameColum1673870953478 implements MigrationInterface {
    name = 'changeNameColum1673870953478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_28bedaa57c26b26f953d27d8df0"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_7fdb8279503d87a8b6a1880e3d4"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_483dc853183f8dfcf9410f7a13e"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "customerCustomerId" TO "customer_id"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "productProductId"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "orderOrderId"`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "product_id" integer`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "order_id" integer`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_9263386c35b6b242540f9493b00" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "customers"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_9263386c35b6b242540f9493b00"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "orderOrderId" integer`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "productProductId" integer`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "customer_id" TO "customerCustomerId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_483dc853183f8dfcf9410f7a13e" FOREIGN KEY ("customerCustomerId") REFERENCES "customers"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_7fdb8279503d87a8b6a1880e3d4" FOREIGN KEY ("orderOrderId") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_28bedaa57c26b26f953d27d8df0" FOREIGN KEY ("productProductId") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
