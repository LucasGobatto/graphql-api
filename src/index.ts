import "reflect-metadata";

import { useContainer } from "typeorm";
import { Container } from 'typedi';
import { bootstrap } from "./bootstrap";


useContainer(Container)

bootstrap();
