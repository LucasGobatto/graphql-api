import Container from "typedi";
import { Logger } from "./logger";

export const logger = Container.get(Logger);
