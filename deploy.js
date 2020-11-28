const { readdirSync, unlinkSync, rmdirSync } = require('fs');
const { join } = require('path');

const base = `${__dirname}/out`;
for (const path of readdirSync(base))
	if (!path.startsWith('.git'))
		try {
			unlinkSync(join(base, path));
		} catch (error) {
			try {
				rmdirSync(join(base, path), {
					recursive: true
				});
			} catch (e) {
				e;
			}
		}
