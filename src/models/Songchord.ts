import mongoose from "mongoose";

const SongchordSchema = new mongoose.Schema({
  idSong: { type: String, required: true },
  idChord: { type: mongoose.Schema.Types.ObjectId, ref: 'Chord', required: true }
});

export interface ISongchord {
  _id: mongoose.Types.ObjectId;
  idSong: string;
  idChord: mongoose.Types.ObjectId;
}

export default mongoose.model('Songchord', SongchordSchema, 'songchord'); 