"""
Fills the database with sample agents and properties, and downloads real photos.
Run:  python manage.py seed_data
Needs an internet connection. Safe to run twice (it skips what already exists).
"""
import urllib.request

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand

from properties.models import Agent, Property, PropertyImage


def photo(photo_id):
    return f"https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w=1200&q=80"


VILLA = "photo-1613490493576-7fde63acd811"
APT = "photo-1545324418-cc1a3fa10c00"
PENT = "photo-1512917774080-9991f1c4c750"
HOME = "photo-1568605114967-8130f3a36994"
LUX = "photo-1600585154340-be6161a56a0c"
FLAT = "photo-1600607687939-ce8a6c25118c"
MODERN = "photo-1600596542815-ffad4c1539a9"
INTERIOR = "photo-1600566753086-00f18fb6b3ea"
OFFICE = "photo-1497366216548-37526070297c"
LAND = "photo-1500382017468-9049fed747ef"

AGENTS = [
    dict(name="Rahul Sharma", designation="Senior Property Consultant", location="Bangalore", phone="+91 98765 43210",
         email="rahul@realty.example", experience_years=8,
         biography="Rahul helps families and investors find premium homes across Bangalore and Hyderabad."),
    dict(name="Priya Nair", designation="Luxury Home Specialist", location="Mumbai", phone="+91 98765 43211",
         email="priya@realty.example", experience_years=10,
         biography="Priya specialises in sea-facing apartments and penthouses in Mumbai and Goa."),
    dict(name="Arjun Mehta", designation="Commercial Advisor", location="Delhi", phone="+91 98765 43212",
         email="arjun@realty.example", experience_years=6,
         biography="Arjun advises on offices, retail spaces and land across Delhi NCR and Pune."),
]

# title, location, city, type, status, price (rupees), beds, baths, area, featured, agent index, photos
PROPERTIES = [
    ("Luxury Villa", "Whitefield", "Bangalore", "villa", "sale", 28000000, 4, 4, 3200, True, 0, [VILLA, INTERIOR, MODERN]),
    ("Garden Villa", "Sarjapur Road", "Bangalore", "villa", "sale", 19500000, 4, 3, 2800, False, 0, [HOME, LUX, INTERIOR]),
    ("Sea View Apartment", "Bandra West", "Mumbai", "apartment", "sale", 45000000, 3, 3, 1850, True, 1, [APT, INTERIOR, FLAT]),
    ("Skyline Penthouse", "Worli", "Mumbai", "penthouse", "sale", 98000000, 4, 5, 4200, True, 1, [PENT, LUX, INTERIOR]),
    ("Modern Penthouse", "Gachibowli", "Hyderabad", "penthouse", "sale", 32000000, 4, 4, 2900, False, 0, [PENT, MODERN, INTERIOR]),
    ("Family Home", "Koregaon Park", "Pune", "luxury", "rent", 85000, 3, 2, 1700, False, 2, [HOME, FLAT, INTERIOR]),
    ("Beach Villa", "Candolim", "Goa", "luxury", "sale", 59000000, 5, 5, 4100, True, 1, [LUX, VILLA, MODERN]),
    ("Designer Flat", "Vasant Kunj", "Delhi", "apartment", "sale", 21000000, 3, 2, 1500, False, 2, [FLAT, APT, INTERIOR]),
    ("Corporate Office Space", "Connaught Place", "Delhi", "commercial", "rent", 250000, 0, 4, 5000, False, 2, [OFFICE, MODERN, INTERIOR]),
    ("Premium Residential Plot", "Devanahalli", "Bangalore", "plot", "sale", 12500000, 0, 0, 2400, False, 0, [LAND, HOME, MODERN]),
]

DESCRIPTION = (
    "A beautifully designed property in a sought-after location, with bright open living spaces, quality finishes "
    "and excellent connectivity to schools, hospitals and business hubs.\n\n"
    "Contact us to arrange a private viewing."
)


class Command(BaseCommand):
    help = "Create sample agents, properties and photos"

    def handle(self, *args, **options):
        agents = []
        for data in AGENTS:
            agent, _ = Agent.objects.get_or_create(email=data["email"], defaults=data)
            agents.append(agent)

        cache = {}  # so each photo is downloaded only once

        def download(photo_id):
            if photo_id not in cache:
                try:
                    req = urllib.request.Request(photo(photo_id), headers={"User-Agent": "Mozilla/5.0"})
                    cache[photo_id] = urllib.request.urlopen(req, timeout=30).read()
                except Exception as err:
                    self.stdout.write(self.style.WARNING(f"  Could not download {photo_id}: {err}"))
                    cache[photo_id] = None
            return cache[photo_id]

        for title, loc, city, ptype, status, price, beds, baths, area, featured, a, photos in PROPERTIES:
            if Property.objects.filter(title=title, city=city).exists():
                self.stdout.write(f"Skipped (already exists): {title}, {city}")
                continue
            prop = Property.objects.create(
                title=title, description=DESCRIPTION, price=price, location=loc, city=city, property_type=ptype,
                status=status, bedrooms=beds, bathrooms=baths, area=area, featured=featured, agent=agents[a],
            )
            saved = 0
            for i, photo_id in enumerate(photos, start=1):
                content = download(photo_id)
                if content:
                    PropertyImage.objects.create(property=prop, image=ContentFile(content, name=f"{prop.slug}-{i}.jpg"))
                    saved += 1
            self.stdout.write(self.style.SUCCESS(f"Created: {title}, {city} ({saved} photos)"))

        self.stdout.write(self.style.SUCCESS("Done."))