import Hero from '@/components/Hero'
import { SliderData } from '@/components/Slider/SliderData'
import Slider from '@/components/Slider'

export default function Home() {
  return (
    <>
      <main>
        <Hero heading="Brainbuds" message="Your personal instagram assistant"></Hero>
        <Slider slides={SliderData} />
      </main>
    </>
  )
}
