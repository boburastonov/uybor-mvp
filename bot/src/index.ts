import { Bot } from 'grammy';
import dotenv from 'dotenv';
import { registerCommands } from './commands';
import { registerVerificationHandlers } from './verification';

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('BOT_TOKEN is not defined in environment variables.');
  process.exit(1);
}

const bot = new Bot(token);

registerCommands(bot);
registerVerificationHandlers(bot);

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  console.error(e);
});

process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());

console.log('Bot is starting up...');
bot.start();
