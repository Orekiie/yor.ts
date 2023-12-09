import { Modal } from '../interfaces/Modal';

import { ModalContext } from './Contexts/ModalContext';

export class YorInteractionModal implements Modal {
  id!: string;
  execute!: (context: ModalContext) => void | Promise<void>;
}
