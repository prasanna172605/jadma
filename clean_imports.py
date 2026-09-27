import sys

with open('src/pages/Home.tsx', 'r') as f:
    c = f.read()

c = c.replace('import { CheckCircle2, ArrowRight, Star, MapPin, HeartPulse, Shield, Award, Users, ChevronLeft, ChevronRight } from \'lucide-react\';',
              'import { CheckCircle2, ArrowRight, Star, MapPin, HeartPulse, Shield, Award, Users } from \'lucide-react\';')

c = c.replace("  const scrollRef = useRef<HTMLDivElement>(null);\n\n  const scroll = (direction: 'left' | 'right') => {\n    if (scrollRef.current) {\n      const { scrollLeft, clientWidth } = scrollRef.current;\n      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;\n      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });\n    }\n  };\n", "")

with open('src/pages/Home.tsx', 'w') as f:
    f.write(c)
