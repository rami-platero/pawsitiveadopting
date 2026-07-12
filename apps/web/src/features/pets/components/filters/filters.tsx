"use client"
import CheckboxFilter from '@/shared/components/filters/checkbox-filter'
import { Button } from '@pawsitiveadopting/ui/components/button'
import { Checkbox } from '@pawsitiveadopting/ui/components/checkbox'
import { Label } from '@pawsitiveadopting/ui/components/label'
import { RadioGroup, RadioGroupItem } from '@pawsitiveadopting/ui/components/radio-group'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@pawsitiveadopting/ui/components/sheet'
import { parseAsArrayOf, parseAsFloat, parseAsString, useQueryStates } from 'nuqs'
import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import LocationSearch from './location-search'
import RadioFilter from '@/shared/components/filters/radio-filter'
import { useTranslations } from 'next-intl'

type FacetOption = {
    value: string;
    count: number;
}

type AvailableFilters = {
    sexOptions: FacetOption[];
    colors: FacetOption[];
    temperaments: FacetOption[];
    ageGroups: FacetOption[];
}

type Props = {
    availableFilters: AvailableFilters;
}

const Filters = ({ availableFilters }: Props) => {
    const t = useTranslations('Pets.Filters')
    const [open, setOpen] = useState(false)

    const [filters, setFilters] = useQueryStates({
        type: parseAsArrayOf(parseAsString).withDefault([]).withOptions({ shallow: false, throttleMs: 500 }),
        age: parseAsArrayOf(parseAsString).withDefault([]).withOptions({ shallow: false, throttleMs: 500 }),
        color: parseAsArrayOf(parseAsString).withDefault([]).withOptions({ shallow: false, throttleMs: 500 }),
        location: parseAsString.withDefault('').withOptions({ shallow: false }),
        lat: parseAsFloat.withOptions({ shallow: false }),
        lng: parseAsFloat.withOptions({ shallow: false }),
        radius: parseAsFloat.withDefault(50).withOptions({ shallow: false }),
        country: parseAsString.withDefault('').withOptions({ shallow: false }),
        sameCountryOnly: parseAsString.withDefault('false').withOptions({ shallow: false }),
        sortBy: parseAsString.withDefault('newest').withOptions({ shallow: false }),
        sex: parseAsString.withDefault('').withOptions({ shallow: false }),
        goodWithKids: parseAsString.withDefault('false').withOptions({ shallow: false, throttleMs: 500 }),
        goodWithDogs: parseAsString.withDefault('false').withOptions({ shallow: false, throttleMs: 500 }),
        goodWithCats: parseAsString.withDefault('false').withOptions({ shallow: false, throttleMs: 500 }),
        goodInApartment: parseAsString.withDefault('false').withOptions({ shallow: false, throttleMs: 500 }),
        goodInHouse: parseAsString.withDefault('false').withOptions({ shallow: false, throttleMs: 500 }),
        goodInGarden: parseAsString.withDefault('false').withOptions({ shallow: false, throttleMs: 500 }),
    })


    const toggleFilter = (filterKey: 'type' | 'age' | 'color', value: string) => {
        setFilters((current) => ({
            ...current,
            [filterKey]: current[filterKey].includes(value)
                ? current[filterKey].filter((item) => item !== value)
                : [...current[filterKey], value]
        }))
    }

    const toggleSortBy = (value: string) => {
        setFilters((current) => ({
            ...current,
            sortBy: value
        }))
    }

    const ageOptions = availableFilters.ageGroups.map((item) => ({
        value: item.value,
        label: t(`age.${item.value}`),
        count: item.count
    }))

    const sexOptions = availableFilters.sexOptions.map((item) => ({
        value: item.value,
        label: t(`sex.${item.value}`),
        count: item.count
    }))

    const colorOptions = availableFilters.colors.map((item) => ({
        value: item.value,
        label: item.value.charAt(0).toUpperCase() + item.value.slice(1),
        count: item.count
    }))

    const ANIMAL_TYPE_OPTIONS = [
        { value: 'dog', label: t('animalType.dog') },
        { value: 'cat', label: t('animalType.cat') },
    ]

    type GoodWithKey = 'goodWithKids' | 'goodWithDogs' | 'goodWithCats'
    type GoodInKey = 'goodInApartment' | 'goodInHouse' | 'goodInGarden'

    const GOOD_WITH_OPTIONS: { value: GoodWithKey; label: string }[] = [
        { value: 'goodWithKids', label: t('goodWith.kids') },
        { value: 'goodWithDogs', label: t('goodWith.dogs') },
        { value: 'goodWithCats', label: t('goodWith.cats') },
    ]

    const GOOD_IN_OPTIONS: { value: GoodInKey; label: string }[] = [
        { value: 'goodInApartment', label: t('goodIn.apartment') },
        { value: 'goodInHouse', label: t('goodIn.house') },
        { value: 'goodInGarden', label: t('goodIn.garden') },
    ]

    const toggleBooleanFilter = (key: GoodWithKey | GoodInKey) => {
        setFilters((current) => ({
            ...current,
            [key]: current[key] === 'true' ? null : 'true',
        }))
    }

    const goodWithSelected = GOOD_WITH_OPTIONS
        .filter((option) => filters[option.value] === 'true')
        .map((option) => option.value)

    const goodInSelected = GOOD_IN_OPTIONS
        .filter((option) => filters[option.value] === 'true')
        .map((option) => option.value)

    const RADIUS_OPTIONS = [10, 25, 50, 100, 200];

    const FiltersContent = () => (
        <>
            <div className='flex justify-between items-center'>
                <h2 className='font-medium text-lg'>{t('title')}</h2>
                <Button variant='ghost' size='sm' onClick={() => setFilters(null)}>
                    {t('clearAll')}
                </Button>
            </div>

            <div className='h-px bg-gray-200' />

            <LocationSearch
                value={filters.location}
                onLocationSelect={(loc) => {
                    setFilters({
                        location: loc.name,
                        lat: loc.lat,
                        lng: loc.lng,
                        country: loc.country,
                    })
                }}
                onClear={() => {
                    setFilters({
                        location: null,
                        lat: null,
                        lng: null,
                        country: null,
                        sameCountryOnly: null,
                    })
                }}
            />

            {filters.lat && filters.lng && (
                <div className='space-y-2'>
                    <Label className='text-sm font-medium'>{t('radius')}</Label>
                    <RadioGroup
                        value={String(filters.radius ?? 50)}
                        onValueChange={(val) => setFilters({ radius: Number(val) })}
                        className='flex flex-wrap gap-2'
                    >
                        {RADIUS_OPTIONS.map((r) => (
                            <div key={r} className='flex items-center space-x-1'>
                                <RadioGroupItem value={String(r)} id={`radius-${r}`} />
                                <Label htmlFor={`radius-${r}`} className='text-xs text-gray-700 cursor-pointer'>{r} km</Label>
                            </div>
                        ))}
                    </RadioGroup>

                    {filters.country && (
                        <div className='flex items-center gap-2 pt-1'>
                            <Checkbox
                                id='same-country-only'
                                checked={filters.sameCountryOnly === 'true'}
                                onCheckedChange={(checked) =>
                                    setFilters({ sameCountryOnly: checked ? 'true' : null })
                                }
                            />
                            <Label htmlFor='same-country-only' className='text-xs text-gray-700 cursor-pointer'>
                                {t('sameCountryOnly')}
                            </Label>
                        </div>
                    )}
                </div>
            )}

            <div className='h-px bg-gray-200' />

            <RadioGroup value={filters.sortBy} className='p-2 text-sm font-normal' onValueChange={toggleSortBy}>
                <h2>{t('sortBy.title')}</h2>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value='newest' id="newest" />
                    <Label htmlFor="newest" className='text-gray-700 cursor-pointer'>{t('sortBy.newest')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value='oldest' id="oldest" />
                    <Label htmlFor="oldest" className='text-gray-700 cursor-pointer'>{t('sortBy.oldest')}</Label>
                </div>
            </RadioGroup>

            <CheckboxFilter
                name={t('animalType.title')}
                options={ANIMAL_TYPE_OPTIONS}
                selectedValues={filters.type}
                onToggle={(value) => toggleFilter('type', value)}
            />

            <RadioFilter
                name={t('sex.title')}
                options={sexOptions}
                selectedValue={filters.sex}
                onChange={(value) => setFilters({ sex: value })}
            />

            <CheckboxFilter
                name={t('age.title')}
                options={ageOptions}
                selectedValues={filters.age}
                onToggle={(value) => toggleFilter('age', value)}
            />

            <CheckboxFilter
                name={t('color.title')}
                options={colorOptions}
                selectedValues={filters.color}
                onToggle={(value) => toggleFilter('color', value)}
            />

            <CheckboxFilter
                name={t('goodWith.title')}
                options={GOOD_WITH_OPTIONS}
                selectedValues={goodWithSelected}
                onToggle={(value) => toggleBooleanFilter(value as GoodWithKey)}
            />

            <CheckboxFilter
                name={t('goodIn.title')}
                options={GOOD_IN_OPTIONS}
                selectedValues={goodInSelected}
                onToggle={(value) => toggleBooleanFilter(value as GoodInKey)}
            />
        </>
    )

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild className='lg:hidden'>
                    <Button variant='outline' size='sm' className='gap-2'>
                        <Menu className='size-4' />
                        {t('title')}
                    </Button>
                </SheetTrigger>
                <SheetContent side='left' className='w-80 space-y-2'>
                    <SheetHeader>
                        <SheetTitle>{t('title')}</SheetTitle>
                    </SheetHeader>
                    <div className='space-y-2 overflow-y-auto max-h-[calc(100vh-100px)] px-4'>
                        <FiltersContent />
                    </div>
                </SheetContent>
            </Sheet>

            <div className='hidden lg:block max-w-xs w-full shrink-0 space-y-2'>
                <FiltersContent />
            </div>
        </>
    )
}

export default Filters