import Knex from 'knex';
// Criação das tableas do BD

// Quando da bom =D
export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('bio').notNullable();
  })
}

// Delete table

// Quando da merda =(
export async function down(knex: Knex){
  return knex.schema.dropTable('users');
}