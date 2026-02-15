"use client"
import CheckboxFilter from '@/shared/components/filters/checkbox-filter'
import { Button } from '@pawsitiveadopting/ui/components/button'
import { Label } from '@pawsitiveadopting/ui/components/label'
import { RadioGroup, RadioGroupItem } from '@pawsitiveadopting/ui/components/radio-group'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@pawsitiveadopting/ui/components/sheet'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import React, { useState } from 'react'
import { Menu } from 'lucide-react'

type FacetOption = {
    value: string;
    count: number;
}

type AvailableFilters = {
    breeds: FacetOption[];
    colors: FacetOption[];
    temperaments: FacetOption[];
    ageGroups: FacetOption[];
}

type Props = {
    availableFilters: AvailableFilters;
}

const ANIMAL_TYPE_OPTIONS = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
]

const Filters = ({ availableFilters }: Props) => {
    const [open, setOpen] = useState(false)

    const [filters, setFilters] = useQueryStates({
        type: parseAsArrayOf(parseAsString).withDefault([]).withOptions({ shallow: false, throttleMs: 500 }),
        breed: parseAsArrayOf(parseAsString).withDefault([]).withOptions({ shallow: false, throttleMs: 500 }),
        age: parseAsArrayOf(parseAsString).withDefault([]).withOptions({ shallow: false, throttleMs: 500 }),
        page: parseAsString.withDefault('1').withOptions({ shallow: false }),
        sortBy: parseAsString.withDefault('newest').withOptions({ shallow: false }),
    })

    const toggleFilter = (filterKey: 'type' | 'breed' | 'age', value: string) => {
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

    const breedOptions = availableFilters.breeds.map((item) => ({
        value: item.value,
        label: item.value,
        count: item.count
    }))

    const ageOptions = availableFilters.ageGroups.map((item) => ({
        value: item.value,
        label: item.value.charAt(0).toUpperCase() + item.value.slice(1),
        count: item.count
    }))

    const FiltersContent = () => (
        <>
            <div className='flex justify-between items-center'>
                <h2 className='font-medium text-lg'>Filters</h2>
                <Button variant='ghost' size='sm' onClick={() => setFilters(null)}>
                    Clear all
                </Button>
            </div>

            <div className='h-px bg-gray-200' />

            <RadioGroup defaultValue='newest' className='p-2 text-sm font-normal' onValueChange={toggleSortBy}>
                <h2>Sort By</h2>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value='newest' id="newest" />
                    <Label htmlFor="newest" className='text-gray-700'>Newest</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value='oldest' id="oldest" />
                    <Label htmlFor="oldest" className='text-gray-700'>Oldest</Label>
                </div>
            </RadioGroup>

            <CheckboxFilter
                name="Animal Type"
                options={ANIMAL_TYPE_OPTIONS}
                selectedValues={filters.type}
                onToggle={(value) => toggleFilter('type', value)}
            />

            <CheckboxFilter
                name="Breed"
                options={breedOptions}
                selectedValues={filters.breed}
                onToggle={(value) => toggleFilter('breed', value)}
            />

            <CheckboxFilter
                name="Age"
                options={ageOptions}
                selectedValues={filters.age}
                onToggle={(value) => toggleFilter('age', value)}
            />
        </>
    )

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild className='lg:hidden'>
                    <Button variant='outline' size='sm' className='gap-2'>
                        <Menu className='size-4' />
                        Filters
                    </Button>
                </SheetTrigger>
                <SheetContent side='left' className='w-80 space-y-2'>
                    <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
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