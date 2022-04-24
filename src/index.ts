import "reflect-metadata";

import { useContainer as useTypeContainer } from "typeorm";
import { useContainer as useClassValidatorContainer } from "class-validator";
import { Container } from 'typeorm-typedi-extensions';
import { bootstrap } from "./bootstrap";

useClassValidatorContainer(Container);
useTypeContainer(Container);

bootstrap();
