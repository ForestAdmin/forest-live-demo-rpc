import { Knex } from 'knex';

export async function populate(
  client: Knex,
  tableName: string,
  numberOfElements: number,
  elementBuilder: (i: number) => unknown,
): Promise<number[]> {
  const elements = [];

  for (let i = 0; i < numberOfElements; i += 1) {
    const element = elementBuilder(i);
    elements.push(element as any);
  }

  const results = await client.insert(elements).into(tableName).returning('id');

  return results.map(row => row.id.toString());
}

export async function populateRelation(
  client: Knex,
  tableName: string,
  elementBuilder: (i: number) => any,
) {
  const ids = await client.table(tableName).select('id');

  await Promise.all(
    ids.map(({ id }) => client.table(tableName).where('id', id).update(elementBuilder(id))),
  );
}
