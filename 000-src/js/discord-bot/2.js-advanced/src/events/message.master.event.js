function init_message(channel, message_id, init_content) {
  channel.messages.fetch(message_id)
    .then(msg => { msg.edit(init_content); })
    .catch(err => console.log(err))
  ;
}

function format_date(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${date.getFullYear()}/${m <= 9 ? '0' + m : m}/${d <= 9 ? '0' + d : d}`;
}

function new_challenger_format(old_content, username) {
  const new_item = '- ' + username + ' depuis le ' + format_date(new Date()) + '\n';
  return old_content.slice(0, -3) + new_item + '```';
}

function find_last_master(content) {
  return content.split('\n').slice(-2)[0].split(' ')[2];
}

function history_edit(history_content, challenger, master_win = true) {
  const old_master = find_last_master(history_content);
  let new_item = (master_win ? '* ' : '+ ') + format_date(new Date());
  const who_win = master_win ? old_master : challenger;
  const who_lost = master_win ? challenger : old_master;
  const what_next = master_win ? 'et concerve son titre' : 'un nouveau reigne commence';
  new_item = new_item + ' ' + who_win + ' a vaincu ' + who_lost + ' ' + what_next + '\n';
  return history_content.slice(0, -3) + new_item + '```';
}

function remove_challenger_in_content (old_content, username) {
  const table_content = old_content.split('\n');
  console.log(username);
  console.log(table_content);
  return table_content.filter(c => !c.includes(`- ${username}`)).join('\n');
}

function create_init_message(channel, init_message_begining, bot_id) {
  channel.messages.fetch()
    .then(msgs => {
      const bot_msgs = msgs.array().filter(m => m.author.id === bot_id);
      if (bot_msgs.length < 4) {
        channel.send('hey')
          .then(new_msg => {
            setTimeout(() => {
              new_msg.edit(`${init_message_begining}: ${new_msg.id}`);
            }, 1000);
          }).catch(err => console.log(err))
        ;
      }
    }).catch(err => console.log(err));
}

async function remove_challenger(channel, msg, editing_message_id, username, message_fail, message_succes) {
  let do_we_continue = true
  console.log(4);
  await channel.messages.fetch(editing_message_id)
    .then(editing_msg => {
      console.log(3);
      const editing_content = editing_msg.content;
      if (!editing_content.includes(username)) {
        console.log(2);
        msg.reply(message_fail);
        do_we_continue = false;
        return;
      }
      console.log(1);
      editing_msg.edit(remove_challenger_in_content(editing_content, username));
      msg.channel.send(message_succes);
      return;
    }).catch(err => console.log(err))
  ;
  return do_we_continue;
}

function calc_victory(history_content) {
  const data = {}
  let last_master = ''
  history_content.split('\n')
    .slice(3, -1)
    .map(str => str.split(' ')[2])
    .forEach((name) => {
      if (!data.hasOwnProperty(name)) {
        data[name] = [];
      }
      data_last_index = data[name].length - 1
      if (data_last_index === -1 || last_master !== name) {
        data[name].push(1);
        last_master = name;
      } else {
        data[name][data_last_index]++;
      }
    })
  ;
  data['title'] = ''
    + '```\n'
    + 'Classement des Grands Maîtres par nombre de victoire :\n'
    + '\n';
  return data;

}

function from_calc_victory_to_content(victory_calculation) {
  const data = [];
  let content_table = [];
  Object.keys(victory_calculation).filter(k => k !== 'title').forEach(player => {
    victory_calculation[player].forEach((victories, index) => {
      data.push({
        victories: victories,
        reigns: index + 1,
        player: player
      });
    });
  });
  data.sort((a, b) => b.victories - a.victories);
  content_table = data.map(place => {
    return `- Avec ${place['victories']} victoire(s) ${place['player']} (durant son reigne numero ${place['reigns']})`
  });
  return victory_calculation['title'] + content_table.join('\n') + '```' ;
}

function refresh_victory(channel, victory_hs_message_id, history_content) {
  // edit victory high score message
  channel.messages.fetch(victory_hs_message_id)
    .then(victory_msg => {
      victory_msg.edit(from_calc_victory_to_content(calc_victory(history_content)));
    }).catch(err => console.log(err))
}

module.exports = async (client, msg) => {
  // const challenge_phrase = 'Je defi l\'actuel Grand Maitre';
  // const resign_phrase = 'J\'abandonne mon defi contre le Grand Maitre';
  const challenge_phrase = 'aaa';
  const resign_phrase = 'bbb';
  const master_win_phrase = 'ccc';
  const master_lose_phrase = 'ddd';
  const channel_to_post_name = 'les-grandes-croniques';
  const { init_phrase, message_beginning } = client.config.INIT;
  const bot_id = '605003128559108107';
  const master_group_id = '697531349250080798';

  const channel_to_post = msg.client.channels.cache.find(c => c.name === channel_to_post_name);
  const is_master = msg.member.roles.cache.has(master_group_id);

  // TODO  help

  // init bot
  if (msg.content.startsWith(`${init_phrase} 1`)) {
    // create post if there is no bot post
    for (let $i_message = 0; $i_message < 4; $i_message++) {
      create_init_message(channel_to_post, message_beginning, bot_id);
    }
  } else if (msg.content.startsWith(`${init_phrase} 2`)) {
    init_message(
      channel_to_post,
      client.config.HISTORY.message_id,
      client.config.HISTORY.init_message
    );
    init_message(
      channel_to_post,
      client.config.CHALLENGER.message_id,
      client.config.CHALLENGER.init_message
    );
    init_message(
      channel_to_post,
      client.config.TIME_HIGH_SCORE.message_id,
      client.config.TIME_HIGH_SCORE.init_message
    );
    init_message(
      channel_to_post,
      client.config.VICTORY_HIGH_SCORE.message_id,
      client.config.VICTORY_HIGH_SCORE.init_message
    );
  }

  // someone challenge the master
  if (msg.content.toLowerCase().includes(challenge_phrase.toLowerCase())) {
    if (is_master) {
      msg.reply('Tu es deja le Maitre, tu vas pas en plus etre le challenger');
      return;
    }
    channel_to_post.messages.fetch(client.config.CHALLENGER.message_id)
      .then(editing_msg => {
        const editing_content = editing_msg.content;
        if (editing_content.includes(msg.author.username)) {
          msg.reply('Desole tu es deja challenger tu ne peux pas te reinscrire');
          return false;
        }
        editing_msg.edit(new_challenger_format(editing_content, msg.author.username));
        msg.reply('Tu as ete ajoute a la liste des challengers');
        return true;
      }).catch(err => console.log(err))
    ;
  }

  // resign the challenge
  if (msg.content.toLowerCase().includes(resign_phrase.toLowerCase())) {
    remove_challenger(
      channel_to_post,
      msg,
      client.config.CHALLENGER.message_id,
      msg.author.username,
      'Tu n\'etais pas challenger, tu crois me tricker oh !',
      'Tu as ete retire de la liste des challengers'
    );
  }

  // master win
  if (msg.content.toLowerCase().includes(master_win_phrase.toLowerCase())) {
    let do_we_continue = true;
    if (!is_master) {
      msg.reply('Tu n es pas le grand maitre tu n as pas le droit a cette commande');
      return;
    }
    if (msg.mentions.users.array().length === 0) {
      msg.reply(`Merci de me prevenir que tu as gagner, mais contre qui ?`);
      return;
    }
    challenger = msg.mentions.users.first().username;

    // edit challenger message
    do_we_continue = await remove_challenger(
      channel_to_post,
      msg,
      client.config.CHALLENGER.message_id,
      challenger,
      `${challenger} ne t a pas defie, tu as beau etre grand maitre, tu m auras pas !`,
      'Qui vaincra le grand maitre ?'
    )

    if (!do_we_continue) {
      return;
    }

    // edit history message
    channel_to_post.messages.fetch(client.config.HISTORY.message_id)
      .then(history_msg => {
        history_msg.edit(history_edit(history_msg.content, msg.mentions.users.first().username));

        // edit victory high score message

        refresh_victory(
          channel_to_post,
          client.config.VICTORY_HIGH_SCORE.message_id,
          history_msg.content
        );
      }).catch(err => console.log(err))
    ;
  }

  // master lose
  if (msg.content.toLowerCase().includes(master_lose_phrase.toLowerCase())) {
    let do_we_continue = true;
    if (!is_master) {
      msg.reply('Tu n es pas le grand maitre tu n as pas le droit a cette commande');
      return;
    }
    let old_master = ''
    channel_to_post.messages.fetch(client.config.HISTORY.message_id)
      .then(history_msg => {
        old_master = find_last_master(history_msg.content);
      });

    // edit challenger message
    do_we_continue = await remove_challenger(
      channel_to_post,
      msg,
      client.config.CHALLENGER.message_id,
      msg.author.username,
      '',
      'Un nouveau maitre est dans la place'
    )

    // edit history message
    channel_to_post.messages.fetch(client.config.HISTORY.message_id)
      .then(history_msg => {
        history_msg.edit(history_edit(history_msg.content, msg.author.username, false));

        // edit victory high score message

        refresh_victory(
          channel_to_post,
          client.config.VICTORY_HIGH_SCORE.message_id,
          history_msg.content
        );
      }).catch(err => console.log(err))
    ;
  }

  // TODO high score during
};
