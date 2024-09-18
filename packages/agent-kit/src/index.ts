/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { kit } from "@breadboard-ai/build";
import type { GraphDescriptor } from "@google-labs/breadboard";
import content from "../bgl/content.bgl.json" with { type: "application/json" };
import specialist2 from "../bgl/specialist-2.bgl.json" with { type: "application/json" };
import human from "./boards/human.js";
import joiner from "./boards/joiner.js";
import looper from "./boards/looper.js";
import repeater from "./boards/repeater.js";
import specialist from "./boards/specialist.js";
import structuredWorker from "./boards/structured-worker.js";
import worker from "./boards/worker.js";

const agentKit = await kit({
  title: "Agent Kit",
  description: "A collection of nodes for building Agent-like experiences.",
  version: "0.0.1",
  url: "https://raw.githubusercontent.com/breadboard-ai/breadboard/main/packages/agent-kit/graphs/kit.json",
  components: {
    content: content as GraphDescriptor,
    human,
    joiner,
    looper,
    repeater,
    specialist,
    specialist2: specialist2 as GraphDescriptor,
    structuredWorker,
    worker,
  },
});

export default agentKit;
export const agents = await agentKit.legacy();
