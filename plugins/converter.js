import { bot } from '../lib/client/plugins.js';
import { FilpMedia, toBlackVideo, toSticker } from './client/scrapers.js';

bot(
	{
		pattern: 'sticker',
		isPublic: true,
		desc: 'Converts Images/Video',
		type: 'converter',
	},
	async message => {
		const media = message.quoted?.video || message.quoted?.image;
		if (!media) return message.sendReply('_Reply Image or Video!_');
		const msg = await message.download();
		const buff = await toSticker(msg);
		return await message.send(buff, { type: 'sticker' });
	},
);

bot(
	{
		pattern: 'take',
		isPublic: true,
		desc: 'Resends Sticker As Own',
		type: 'converter',
	},
	async message => {
		if (!message.quoted?.sticker) return message.sendReply('_Reply Sticker_');
		const msg = await message.download();
		const buff = await toSticker(msg);
		return await message.send(buff, { type: 'sticker' });
	},
);

bot(
	{
		pattern: 'flip',
		isPublic: true,
		desc: 'Flips Media to a particular direction',
		type: 'converter',
	},
	async (message, match) => {
		if (!message.quoted?.image && !message.quoted?.video) return message.sendReply('_Reply An Image Or Video_');
		const options = ['left', 'right', 'vertical', 'horizontal'];
		if (!options.includes(match)) return message.sendReply('_Choose a valid option: ' + message.prefix + 'flip left, right, vertical, or horizontal_');
		console.log('Chosen direction:', match);
		const buff = await message.download();
		const res = await FilpMedia(buff, options);
		return await message.send(res);
	},
);

bot(
	{
		pattern: 'black',
		isPublic: true,
		desc: 'Converts Audio to Black Video',
		type: 'converter',
	},
	async message => {
		if (!message.quoted?.audio) return message.sendReply('_Reply An Audio_');
		const buff = await message.download();
		const res = await toBlackVideo(buff);
		return await message.send(res);
	},
);
