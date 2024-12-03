'use client'

import { validateCart, ValidationResponse } from '@/app/cart/enrollment';
import { CartList, CartListProps } from './CartList';
import CartControls from './CartControls';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import { ValidationResultsDialog } from './ValidationResultsDialog';

export function CartView(cart: CartListProps) {
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = 
        useState<ValidationResponse | null>(null);

    async function tryValidate(enrollMode: boolean = false) {
        const newResult = await validateCart(enrollMode);
        if (newResult !== undefined) {
            setResults(newResult);
            setShowResults(true);
        }
    }

    return (
        <Dialog open={showResults} onOpenChange={setShowResults}>
            <CartList {...cart}/>
            <div>
                <CartControls onValidate={() => tryValidate()} onEnroll={() => tryValidate(true)}/>
            </div>
            {results && (   
                <ValidationResultsDialog {...results}/>
            )}
        </Dialog>
    )
}