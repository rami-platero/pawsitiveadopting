"use client"
import CheckboxFilter from '@/shared/components/filters/checkbox-filter'
import { Button } from '@pawsitiveadopting/ui/components/button'
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
        page: parseAsString.withDefault('1').withOptions({ shallow: false }),
        sortBy: parseAsString.withDefault('newest').withOptions({ shallow: false }),
        sex: parseAsString.withDefault('').withOptions({ shallow: false }),
    })


    const toggleFilter = (filterKey: 'type' | 'age' | 'color', value: string) => {
        setFilters((current) => ({
            ...current,
            page: null,
            [filterKey]: current[filterKey].includes(value)
                ? current[filterKey].filter((item) => item !== value)
                : [...current[filterKey], value]
        }))
    }

    const toggleSortBy = (value: string) => {
        setFilters((current) => ({
            ...current,
            page: null,
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
                        page: null,
                    })
                }}
                onClear={() => {
                    setFilters({
                        location: null,
                        lat: null,
                        lng: null,
                        page: null,
                    })
                }}
            />

            {filters.lat && filters.lng && (
                <div className='space-y-2'>
                    <Label className='text-sm font-medium'>{t('radius')}</Label>
                    <RadioGroup
                        value={String(filters.radius ?? 50)}
                        onValueChange={(val) => setFilters({ radius: Number(val), page: null })}
                        className='flex flex-wrap gap-2'
                    >
                        {RADIUS_OPTIONS.map((r) => (
                            <div key={r} className='flex items-center space-x-1'>
                                <RadioGroupItem value={String(r)} id={`radius-${r}`} />
                                <Label htmlFor={`radius-${r}`} className='text-xs text-gray-700 cursor-pointer'>{r} km</Label>
                            </div>
                        ))}
                    </RadioGroup>
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
                onChange={(value) => setFilters({ sex: value, page: null })}
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