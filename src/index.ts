import "reflect-metadata";

import { useContainer as useClassValidatorContainer } from "class-validator";
import { useContainer } from "typeorm";
import { Container } from 'typeorm-typedi-extensions';
import { bootstrap } from "./bootstrap";

useClassValidatorContainer(Container);
useContainer(Container);

bootstrap();
