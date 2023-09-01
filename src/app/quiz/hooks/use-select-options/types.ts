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
export type Vibe = 'COLD_HAUGHTY' | 'BRIGHT_LOVELY' | 'QUIET_CALM' | 'ACTIVE';

export interface Options {
  relationship: Relationship | Noop;
  age: Age | Noop;
  mind: Mind | Noop;
  color: Color | Noop;
  vibe: Vibe | Noop;
}

export type OptionKey = keyof Options;
