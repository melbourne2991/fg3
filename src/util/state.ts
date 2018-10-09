import { Lens } from "ramda";

export const addNormalizedItem = R.curry<Lens, Lens, any, any>(
  <T extends WithId>(itemLens: Lens, itemIdsLens: Lens, item: T) =>
    R.pipe(
      R.over(itemLens, R.assoc(item.id, item)),
      R.over(itemIdsLens, R.append(item.id))
    )
);
