/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/unbound-method */
import 'mocha';
import { describe, it } from 'node:test';

import { SlashCommandBuilder } from '@discordjs/builders';
import { Collection } from '@discordjs/collection';
import { API } from '@discordjs/core';
import { REST } from '@discordjs/rest';
import { expect } from 'chai';

import { Command, YorClient } from '../src';

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
    const command: Command = {
      builder: new SlashCommandBuilder(),
      execute: (_context) => {},
    };

    void it('should register a command', () => {
      client.registerCommand(command);

      expect(client.commands.size).to.equal(1);
    });

    void it('should unregister a command', () => {
      client.unregisterCommand(command);

      expect(client.commands.size).to.equal(0);
    });
  });
});
