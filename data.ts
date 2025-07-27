import {
  CamelFeature,
  Direction,
  Entry,
  Exit,
  Feature,
  Foot,
  Position,
  SitFeature,
  Spin,
  Transition,
  UprightFeature,
} from "./types";

export const spin1: Spin = {
  entry: Entry.DifficultFly,
  initialOrientation: {
    foot: Foot.Right,
    direction: Direction.Back,
  },
  positions: [
    {
      transitions: [],
      description: {
        positionType: Position.Sit,
        features: [SitFeature.Forward],
      },
    },
    {
      transitions: [Transition.ChangeFoot],
      description: {
        positionType: Position.Sit,
        features: [SitFeature.Sideways, Feature.HoldFor8],
      },
    },
  ],
  exit: Exit.None,
};

export const spin2: Spin = {
  entry: Entry.Difficult,
  initialOrientation: {
    foot: Foot.Right,
    direction: Direction.Back,
  },
  positions: [
    {
      transitions: [],
      description: {
        positionType: Position.Camel,
        features: [],
      },
    },
    {
      transitions: [],
      description: {
        positionType: Position.Upright,
        features: [UprightFeature.StraightOrSideways],
      },
    },

    {
      transitions: [Transition.ChangeFoot],
      description: {
        positionType: Position.Sit,
        features: [],
      },
    },
    {
      transitions: [Transition.DifficultChangePosition],
      description: {
        positionType: Position.Camel,
        features: [CamelFeature.Forward],
      },
    },
  ],
  exit: Exit.None,
};
