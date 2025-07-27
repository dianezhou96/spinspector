import { spin1, spin2 } from "./data";
import {
  BASIC_POSITIONS,
  Entry,
  Exit,
  LEVELED_FEATURES,
  MANDATORY_FEATURES,
  Position,
  Spin,
  SPIN_CODES,
  SpinDescription,
  SpinEvaluation,
  SpinType,
  Transition,
} from "./types";

function identifySpin(spin: Spin): SpinDescription | null {
  let spinType: SpinType;
  let incomplete: boolean;
  const allPositions = spin.positions
    .map((position) => position.description.positionType)
    .filter((position) => position != Position.NonBasic);
  const positionsSet = new Set<Position>(allPositions);
  if (positionsSet.size === 0) {
    return null;
  }
  if (positionsSet.size === 1) {
    incomplete = false;
    const position = allPositions[0];
    spinType = position as unknown as SpinType;
  } else if (
    positionsSet.size === 2 &&
    Position.Upright in positionsSet &&
    Position.Layback in positionsSet
  ) {
    incomplete = false;
    spinType = SpinType.Upright;
  } else {
    spinType = SpinType.Combo;
    incomplete = !BASIC_POSITIONS.every((pos) => positionsSet.has(pos));
  }

  const changeFoot = !!spin.positions
    .flatMap((position) => position.transitions)
    .find(
      (transition) =>
        transition &&
        [Transition.ChangeFoot, Transition.JumpChangeFoot].includes(transition)
    );

  return {
    flyEntry: [Entry.Fly, Entry.DifficultFly].includes(spin.entry),
    changeFoot,
    spinType,
    incomplete: false,
  };
}

function getCode(
  spinDescription: SpinDescription,
  spinEvaluation: SpinEvaluation
): string {
  let code = "";
  if (spinDescription.flyEntry) {
    code += "F";
  }
  if (spinDescription.changeFoot) {
    code += "C";
  }
  code += SPIN_CODES[spinDescription.spinType];
  code += "Sp";
  code += spinEvaluation.level;
  if (spinDescription.incomplete) {
    code += "V";
  }
  return code;
}

function evaluateLevel(spin: Spin): SpinEvaluation {
  const allFeatures: string[] = [spin.entry, spin.exit];
  const positionFeatures = spin.positions.flatMap<string>((position) => [
    ...position.transitions,
    ...position.description.features,
  ]);
  allFeatures.push(...positionFeatures);

  const leveledFeatures = allFeatures.filter((feature) =>
    LEVELED_FEATURES.has(feature)
  );

  const countedFeatures: string[] = [];
  const excludedFeatures: string[] = [];
  leveledFeatures.forEach((feature) => {
    if (countedFeatures.includes(feature)) {
      excludedFeatures.push(`${feature} excluded because already used`);
    } else if (
      feature === Exit.Difficult &&
      countedFeatures.includes(Entry.Difficult)
    ) {
      excludedFeatures.push(
        `${feature} excluded because cannot be counted with difficult entry`
      );
    } else {
      countedFeatures.push(feature);
    }
  });

  let level = countedFeatures.length;
  if (countedFeatures.length >= 4) {
    if (countedFeatures.find((feature) => MANDATORY_FEATURES.has(feature))) {
      level = 4;
    } else {
      level = 3;
      excludedFeatures.push("Missing mandatory feature to be level 4");
    }
  }

  return {
    level,
    countedFeatures,
    excludedFeatures,
  };
}

// const spin = spin1;
const spin = spin2;
const spinDescription = identifySpin(spin);
const spinEvaluation = evaluateLevel(spin);
const spinCode = spinDescription
  ? getCode(spinDescription, spinEvaluation)
  : "NO VALUE";
console.log(spinDescription);
console.log(spinEvaluation);
console.log(spinCode);
