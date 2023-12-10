/* eslint-disable @typescript-eslint/no-empty-function */
import 'mocha';
import { describe, it } from 'node:test';

import { expect } from 'chai';

import { CommandContext, YorClient, YorSlashCommand } from '../src';
import { SlashCommandBuilder } from '../src/builders';

void describe('Genereate a mocked YorClient', () => {
  const client = new YorClient({
    token: 'test',
    application: {
      id: 'test',
      publicKey: 'test',
    },
  });

  void describe('Registering and unregistering commands', () => {
    class TestCommand extends YorSlashCommand {
      public builder = new SlashCommandBuilder().setName('test');
      public execute = (_context: CommandContext) => {};
    }

    const command = new TestCommand();

    void it('should register a command', () => {
      client.registerCommand(command);

      expect(client.commands.size).to.equal(1);
    });

    void it('should throw an error when registering a command with same name', () => {
      expect(() => client.registerCommand(command)).to.throw();
    });

    void it('should unregister a command', () => {
      client.unregisterCommand(command);

      expect(client.commands.size).to.equal(0);
    });

    void it('should register a command using array', () => {
      client.registerCommands([command]);

      expect(client.commands.size).to.equal(1);
    });

    void it('should throw an error when registering a command with same name with array', () => {
      expect(() => client.registerCommands([command])).to.throw();
    });

    void it('should unregister a command using array', () => {
      client.unregisterCommands([command]);

      expect(client.commands.size).to.equal(0);
    });

    void it('Command properties must be accessible', () => {
      expect(command.builder).to.be.an.instanceOf(SlashCommandBuilder);
      expect(command.execute).to.be.a('function');
    });
  });

  expect(client).to.be.an.instanceOf(YorClient);
});
