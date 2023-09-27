import { useState, useEffect } from 'react'
import { Container, Links, Content } from './styles'
import { useParams, useNavigate } from 'react-router-dom'

import { api } from '../../services/api'

import { Tag } from '../../components/Tag'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'

export function Details() {
  const [data, setData] = useState()

  const params = useParams()
  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  async function handleRemove() {
    const confirm = window.confirm("Are you sure you want to remove this")

    if (confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNote()
  }, [params.id])

  return (
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>
            <ButtonText
              title="Delete note"
              onClick={handleRemove}
            />

            <h1>
              {data.title}
            </h1>
            <p>
              {data.description}
            </p>

            {
              data.links &&
              <Section title="Useful links">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} target="_blank" rel="noreferrer">
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Markers">
                {
                  data.tags.map(tag => (
                    <Tag
                      key={String(tag.id)}
                      title="Express"
                    />
                  ))
                }
              </Section>
            }

            <Button
              title='Return'
              onClick={handleBack} />
          </Content>
        </main>
      }

    </Container>
  )
}