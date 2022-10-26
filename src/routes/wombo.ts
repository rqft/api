import type { Input, Output } from '@rqft/http';
import { buildDefaultInstance } from 'wombo-dream-api';
import { give, stop } from '../models/result';
export async function wombo(req: Input<'/wombo/{style}/{query}'>, res: Output) {
  const WomboStyles = {
    psychedelic: 21,
    surreal: 23,
    synthwave: 1,
    ghibli: 22,
    steampunk: 4,
    fantasy: 5,
    vibrant: 6,
    hd: 7,
    psychic: 9,
    darkfantasy: 10,
    mystical: 11,
    baroque: 13,
    etching: 14,
    sdali: 15,
    wuhtercuhler: 16,
    provenance: 17,
    moonwalker: 19,
    blacklight: 20,
    none: 3,
    ukiyoe: 2,
    rosegold: 18,
  };

  const style = (
    req.params.get('style') || 'none'
  ).toLowerCase() as keyof typeof WomboStyles;
  const query = req.params.get('query');

  if (!(style in WomboStyles)) {
    stop(res, 400, 'Invalid style');
  }

  if (!query) {
    stop(res, 400, 'No query provided');
  }

  console.log(style, query);

  await buildDefaultInstance().generatePicture(
    query,
    WomboStyles[style],
    async (task) => {
      if (task.result) {
        if (task.result.final) {
          give(res, task.result.final);
        }
      }
    }
  );
}
