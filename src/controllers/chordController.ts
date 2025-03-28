import { Request, Response } from 'express';
import Chord from '../models/Chord';

// Получить все аккорды
export const getAllChords = async (req: Request, res: Response) => {
  try {
    const chords = await Chord.find();
    res.status(200).json(chords);
  } catch (error) {
    console.error('Ошибка при получении аккордов:', error);
    res.status(500).json({ message: 'Ошибка сервера при получении аккордов' });
  }
};

// Получить аккорд по идентификатору
export const getChordById = async (req: Request, res: Response) => {
  try {
    const chord = await Chord.findById(req.params.id);
    
    if (!chord) {
      return res.status(404).json({ message: 'Аккорд не найден' });
    }
    
    res.status(200).json(chord);
  } catch (error) {
    console.error('Ошибка при получении аккорда:', error);
    res.status(500).json({ message: 'Ошибка сервера при получении аккорда' });
  }
};

// Создать новый аккорд
export const createChord = async (req: Request, res: Response) => {
  try {
    const { name, photo } = req.body;
    
    if (!name || !photo) {
      return res.status(400).json({ message: 'Необходимо предоставить имя и фото аккорда' });
    }
    
    const newChord = new Chord({ name, photo });
    const savedChord = await newChord.save();
    
    res.status(201).json(savedChord);
  } catch (error) {
    console.error('Ошибка при создании аккорда:', error);
    res.status(500).json({ message: 'Ошибка сервера при создании аккорда' });
  }
};

// Обновить аккорд
export const updateChord = async (req: Request, res: Response) => {
  try {
    const { name, photo } = req.body;
    
    const updatedChord = await Chord.findByIdAndUpdate(
      req.params.id,
      { name, photo },
      { new: true }
    );
    
    if (!updatedChord) {
      return res.status(404).json({ message: 'Аккорд не найден' });
    }
    
    res.status(200).json(updatedChord);
  } catch (error) {
    console.error('Ошибка при обновлении аккорда:', error);
    res.status(500).json({ message: 'Ошибка сервера при обновлении аккорда' });
  }
};

// Удалить аккорд
export const deleteChord = async (req: Request, res: Response) => {
  try {
    const deletedChord = await Chord.findByIdAndDelete(req.params.id);
    
    if (!deletedChord) {
      return res.status(404).json({ message: 'Аккорд не найден' });
    }
    
    res.status(200).json({ message: 'Аккорд успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении аккорда:', error);
    res.status(500).json({ message: 'Ошибка сервера при удалении аккорда' });
  }
}; 