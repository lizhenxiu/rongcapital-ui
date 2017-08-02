import React from 'react';
import { storiesOf } from '@storybook/react';

import { Switch } from '../../src/base';

storiesOf('base.Switch', module)
	.add('initialize by default', () => (
		<Switch width={80} height={20} />
	));   





