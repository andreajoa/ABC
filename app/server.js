import {createContext} from './lib/context.server';

export async function getLoadContext(request) {
  try {
    return await createContext(request);
  } catch (error) {
    console.error('Error creating load context:', error);
    throw error;
  }
}
