import {
  APIChatInputApplicationCommandInteraction,
  ChannelType,
  GuildMemberFlags,
} from '@discordjs/core/http-only';

export const commandInteraction: APIChatInputApplicationCommandInteraction = {
  type: 2,
  token: 'A_UNIQUE_TOKEN',
  application_id: '',
  version: 1,
  entitlements: [],
  channel: {
    id: '1111',
    type: ChannelType.GuildAnnouncement,
  },
  user: {
    id: '53908232506183680',
    username: 'Mason',
    avatar: 'a_d5efa99b3eeaa7dd43acca82f5692432',
    discriminator: '1337',
    global_name: 'Mason',
    bot: false,
  },
  member: {
    user: {
      id: '53908232506183680',
      username: 'Mason',
      avatar: 'a_d5efa99b3eeaa7dd43acca82f5692432',
      discriminator: '1337',
      global_name: 'Mason',
      bot: false,
    },
    roles: ['539082325061836999'],
    premium_since: null,
    permissions: '2147483647',
    pending: false,
    nick: null,
    mute: false,
    joined_at: '2017-03-13T19:19:14.040000+00:00',
    deaf: false,
    flags: GuildMemberFlags.CompletedOnboarding,
  },
  id: '786008729715212338',
  guild_id: '290926798626357999',
  app_permissions: '442368',
  guild_locale: 'en-US',
  locale: 'en-US',
  data: {
    options: [
      {
        type: 3,
        name: 'cardname',
        value: 'The Gitrog Monster',
      },
    ],
    type: 1,
    name: 'cardsearch',
    id: '771825006014889984',
  },
  channel_id: '645027906669510667',
};
