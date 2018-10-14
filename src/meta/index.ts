import * as I from '../typings';
import io from './io';
import logic from './logic';
import math from './math';
import objects from './objects';
import strings from './strings';

import convert from './convert';

export default [
  io,
  logic,
  math,
  objects,
  strings,
  convert,
] as I.NodeCategoryMeta[];