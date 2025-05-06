import { store, persister } from './configureAppStore';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

const { dispatch } = store;

export { store, persister, dispatch, useSelector, useDispatch };
