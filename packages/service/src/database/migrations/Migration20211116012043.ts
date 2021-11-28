import { Migration } from '@mikro-orm/migrations';

export class Migration20211116012043 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "pausemane" ("id" varchar(255) not null, "pauses" int4 not null);');
    this.addSql('alter table "pausemane" add constraint "pausemane_pkey" primary key ("id");');
    this.addSql('create index "pausemane_id_index" on "pausemane" ("id");');
  }

}
