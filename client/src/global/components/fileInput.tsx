import Button from './button'
import styled from 'styled-components'
import Placeholder from '../../assets/placeholder.jpg'
import { mixins } from '../styles/mixins'
import { useEffect, useId, useState } from 'react'

interface Props {
  defaultSrc?: string,
  state: [
    null | File, 
    React.Dispatch<React.SetStateAction<File | null>>
  ]
}

const FileInput = ({ defaultSrc, state }: Props) => {
  const [value, setValue] = state;
  const [preview, setPreview] = useState<null | string>(null);
  const id = useId();
  
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length) {
      setValue(e.target.files[0]);
    }
  }

  useEffect(() => {
    if(value) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(value);
      fileReader.addEventListener("load", () => {
        setPreview(fileReader.result as string);
      });
    }
  }, [value]);

  return (
    <Container>
      <img 
        style={{
          backgroundImage: `url(${Placeholder})`
        }}
        src={preview || defaultSrc} 
      />
      <label htmlFor={id}>
        <Button 
          onClick={() => {}}
        >Cambiar</Button>
      </label>
      <input 
        id={id} 
        type="file" 
        onChange={changeFile} 
      />
    </Container>
  )
}

export default FileInput

const Container = styled.div`
  display: flex;
  gap: 32px;
  & > img {
    width: 225px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    border: ${mixins.border1};
    background-position: center;
    background-size: cover;
  }
  & > input {
    display: none;
  }
  & button {
    pointer-events: none;
  }
  & > label {
    height: fit-content;
    cursor: pointer;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
`;