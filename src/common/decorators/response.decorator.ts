import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE_METADATA = 'RESPONSE_MESSAGE_METADATA';

export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE_METADATA, message);

export const RESPONSE_FLAT = 'RESPONSE_FLAT';

export const ResponseFlat = () => SetMetadata(RESPONSE_FLAT, true);
