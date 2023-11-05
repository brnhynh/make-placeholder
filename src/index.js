#!/usr/bin/env node
import { Command } from 'commander';

import { imgCommand } from './commands';

const program = new Command();

program
  .version('0.2.0')
  .description('Generate placeholders.')
  .addCommand(imgCommand)
  .parse();
