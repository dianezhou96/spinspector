export enum Foot {
  Left = "left",
  Right = "right",
}

export enum Direction {
  Forward = "forward",
  Back = "back",
}

export type Orientation = {
  foot: Foot;
  direction: Direction;
};

export enum Entry {
  Difficult = "difficult entry",
  DifficultFly = "difficult fly entry",
  Fly = "fly entry",
  None = "standard entry",
}

export enum Exit {
  Difficult = "difficult exit",
  None = "standard exit",
}

export enum Transition {
  ChangeFoot = "change foot",
  JumpChangeFoot = "jump change foot",
  DifficultChangePosition = "difficult change position",
  ChangeDirection = "change direction",
}

export enum Position {
  Upright = "upright",
  Sit = "sit",
  Camel = "camel",
  Layback = "layback",
  NonBasic = "non-basic",
}

export const BASIC_POSITIONS = [Position.Upright, Position.Sit, Position.Camel];

export enum Feature {
  ChangeEdge = "change edge",
  BladeFeature = "blade feature",
  IncreaseSpeed = "increase speed",
  HoldFor8 = "hold for 8",
  JumpSameFoot = "jump same foot",
}

export enum UprightFeature {
  Forward = "upright forward",
  StraightOrSideways = "upright straight or sideways",
}

export enum SitFeature {
  Forward = "sit forward",
  Sideways = "sit sideways",
  Behind = "sit behind",
}

export enum CamelFeature {
  Forward = "camel forward",
  Sideways = "camel sideways",
  Upward = "camel upward",
}

export enum LaybackFeature {
  Side = "layback side",
  Back = "layback feature", // e.g. haircutter, pearl
  Biellmann = "Biellmann",
}

export const LEVELED_FEATURES = new Set<string>([
  Entry.Difficult,
  Entry.DifficultFly,
  Exit.Difficult,
  Transition.JumpChangeFoot,
  Transition.DifficultChangePosition,
  Transition.ChangeDirection,
  ...Object.values(Feature),
  ...Object.values(UprightFeature),
  ...Object.values(SitFeature),
  ...Object.values(CamelFeature),
]);

export const MANDATORY_FEATURES = new Set<string>([
  Entry.DifficultFly,
  Exit.Difficult,
  Transition.DifficultChangePosition,
  Transition.ChangeDirection,
  Feature.ChangeEdge,
  Feature.IncreaseSpeed,
]);

type UprightPositionDescription = {
  positionType: Position.Upright;
  features: (Feature | UprightFeature)[];
};

type SitPositionDescription = {
  positionType: Position.Sit;
  features: (Feature | SitFeature)[];
};

type CamelPositionDescription = {
  positionType: Position.Camel;
  features: (Feature | CamelFeature)[];
};

type LaybackPositionDescription = {
  positionType: Position.Layback;
  features: (Feature | LaybackFeature)[];
};

type NonBasicPositionDescription = {
  positionType: Position.NonBasic;
  features: Feature[];
};

type PositionDescription =
  | UprightPositionDescription
  | SitPositionDescription
  | CamelPositionDescription
  | LaybackPositionDescription
  | NonBasicPositionDescription;

type SpinPosition = {
  transitions: Transition[];
  description: PositionDescription;
};

export type Spin = {
  entry: Entry;
  initialOrientation: Orientation;
  positions: SpinPosition[];
  exit: Exit;
};

export enum SpinType {
  Upright = Position.Upright,
  Sit = Position.Sit,
  Camel = Position.Camel,
  Layback = Position.Layback,
  Combo = "combo",
}

export const SPIN_CODES = {
  [SpinType.Upright]: "U",
  [SpinType.Sit]: "S",
  [SpinType.Camel]: "C",
  [SpinType.Layback]: "L",
  [SpinType.Combo]: "Co",
};

export type SpinDescription = {
  spinType: SpinType;
  flyEntry: boolean;
  changeFoot: boolean;
  incomplete: boolean;
};

export type SpinEvaluation = {
  level: number;
  countedFeatures: string[];
  excludedFeatures: string[];
};
