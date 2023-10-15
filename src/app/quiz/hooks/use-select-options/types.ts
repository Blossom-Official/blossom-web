export type Noop = 'NOOP';
export type Relationship = 'FRIEND' | 'LOVER' | 'FAMILY' | 'ACQUAINTANCE';
export type Age = 'TWENTY' | 'THIRTY' | 'FORTY' | 'ABOVE';
export type Mind =
  | 'GREETING'
  | 'RESPECT'
  | 'THANKS'
  | 'LOVE'
  | 'CONSOLATION'
  | 'NONE';
export type Color =
  | 'RED_ORANGE'
  | 'YELLOW'
  | 'GREEN'
  | 'BLUE_PURPLE'
  | 'PINK'
  | 'ACHROMATIC';
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';

export interface Options {
  relationship: Relationship | Noop;
  age: Age | Noop;
  mind: Mind | Noop;
  color: Color | Noop;
  season: Season | Noop;
}

export type OptionKey = keyof Options;

export type HandleSelectFn = <T extends OptionKey>(
  key: T,
  value: Options[T],
  options?: { onChangeSelection?: () => void }
) => void;
