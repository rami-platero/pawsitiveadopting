"use client"
import { Button } from '@pawsitiveadopting/ui/components/button';
import { useQueryState } from 'nuqs';
import React from 'react'

const Pagination = ({ amountPages = 0 }: { amountPages: number }) => {
    const [pages, setPages] = useQueryState('page', {
        shallow: false, limitUrlUpdates: {
            timeMs: 500,
            method: 'throttle'
        }
    });

    return (
        <div>
            {amountPages > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                    {Array.from({ length: amountPages }, (_, i) => i + 1).map((page) => (
                        <Button disabled={pages === page.toString() || pages === null && page === 1} onClick={() => {
                            setPages(page.toString())
                        }} key={page} className="px-3 py-1 border rounded">
                            {page}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Pagination