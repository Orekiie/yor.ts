import { ModalContext } from '../structures/Contexts/ModalContext';

export interface Modal {
  id: string;
  execute: (context: ModalContext) => Promise<void> | void;
}
