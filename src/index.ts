import "reflect-metadata";

import { useContainer as useClassValidatorContainer } from "class-validator";
import { useContainer as useTypeOrmContainer } from "typeorm";
import { useContainer as useRoutingControllerContainer } from "routing-controllers";
import { Container } from "typeorm-typedi-extensions";
import { bootstrap } from "./bootstrap";

useClassValidatorContainer(Container);
useRoutingControllerContainer(Container);
useTypeOrmContainer(Container);

const isTest = process.argv[1].includes("mocha");

bootstrap(isTest);
