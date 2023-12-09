/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/unbound-method */
import 'mocha';
import { describe, it } from 'node:test';

import { Collection } from '@discordjs/collection';
import { API } from '@discordjs/core';
import { REST } from '@discordjs/rest';
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

  void describe('Verify YorClient', () => {
    void it('should be an instance of YorClient', () => {
      expect(client).to.be.an.instanceOf(YorClient);
    });

    void it('should be an instance of API', () => {
      expect(client.api).to.be.an.instanceOf(API);
    });

    void it('should be an instance of REST', () => {
      expect(client.rest).to.be.an.instanceOf(REST);
    });

    void it('should be a Collection of commands', () => {
      expect(client.commands).to.be.an.instanceOf(Collection);
    });

    void it('should be a Collection of components', () => {
      expect(client.components).to.be.an.instanceOf(Collection);
    });

    void it('should be a Record<MiddlewareFunctionNames, MiddlewareFunction<MiddlewareFunctionNames>[]> of middlewares', () => {
      expect(client.middlewares).to.be.an('object');
    });

    void it('should have a registerCommand method', () => {
      expect(client.registerCommand).to.be.a('function');
    });

    void it('should have a registerCommands method', () => {
      expect(client.registerCommands).to.be.a('function');
    });

    void it('should have a unregisterCommand method', () => {
      expect(client.unregisterCommand).to.be.a('function');
    });

    void it('should have a unregisterCommands method', () => {
      expect(client.unregisterCommands).to.be.a('function');
    });

    void it('should have a unregisterAllCommands method', () => {
      expect(client.unregisterAllCommands).to.be.a('function');
    });

    void it('should have a registerComponent method', () => {
      expect(client.registerComponent).to.be.a('function');
    });

    void it('should have a registerMiddleware method', () => {
      expect(client.createMiddleware).to.be.a('function');
    });
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
});
