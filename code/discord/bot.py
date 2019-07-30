import discord
from discord.ext import commands
import os
import sys

try:
    TOKEN = os.environ['BOT_DISCORD_TOKEN']
except:
    print("Need environment variable: BOT_DISCORD_TOKEN")
    sys.exit(1)

description = '''Bot Python'''
bot = commands.Bot(command_prefix='?', description=description)

@bot.event
async def on_ready():
    print('Logged in as')
    print(bot.user.name)
    print(bot.user.id)
    print('------')

@bot.command()
async def hello():
    """Says Hello World"""
    await bot.say("Hellod")

bot.run(TOKEN)
