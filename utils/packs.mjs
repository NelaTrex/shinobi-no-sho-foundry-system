import { compilePack, extractPack } from '@foundryvtt/foundryvtt-cli';

await extractPack('./packs/macros', './packs/src/macros', {log: true, documentType: 'Macro'});
// await compilePack('./packs/src/macros', './packs/macros');