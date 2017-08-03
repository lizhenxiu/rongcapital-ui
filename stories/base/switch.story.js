import React from 'react';
import { storiesOf } from '@storybook/react';

import { Switch } from '../../src/base';

storiesOf('base.Switch', module)
	.add('initialize by default', () => (
		<Switch />
	))
	.add('initialize switch defaults isOpen true', () => (
		<Switch width={80} height={20} isOpen={true} />
	))
	.add('initialize switch defaults disabled true', () => (
		<Switch width={80} height={20} disabled={true} />
	))	





